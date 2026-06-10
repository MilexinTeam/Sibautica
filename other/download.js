import fs from "fs";
import path from "path";
import { exec } from "child_process";
import https from "https";
import http from "http";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, "..");

// Wczytaj JSON
const raw = fs.readFileSync(path.join(__dirname, "download.json"), "utf8");
const items = JSON.parse(raw);

// Pobieranie pliku z obsługą redirectów
function downloadFile(fileUrl, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) {
      reject(new Error("Too many redirects"));
      return;
    }

    const proto = fileUrl.startsWith("https") ? https : http;

    proto.get(fileUrl, res => {
      // Obsługa redirectów
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const newUrl = res.headers.location;
        if (!newUrl) {
          reject(new Error("Redirect without Location header"));
          return;
        }
        console.log("Redirect:", res.statusCode, "→", newUrl);
        return resolve(downloadFile(newUrl, dest, redirectCount + 1));
      }

      if (res.statusCode !== 200) {
        reject(new Error("HTTP " + res.statusCode));
        return;
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

// Uruchamianie komendy (bash/cmd)
function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { shell: true, cwd: BASE_DIR }, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve({ stdout, stderr });
    });
  });
}

(async () => {
  for (const item of items) {
    const fileUrl = item.url;
    const outPath = path.resolve(BASE_DIR, item.to);
    const post = item.postdownload;

    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    console.log("Pobieram:", fileUrl);
    await downloadFile(fileUrl, outPath);
    console.log("Zapisano do:", outPath);

    if (post && typeof post === "string" && post.trim() !== "") {
      console.log("Wykonuję postdownload:", post);
      await runCommand(post);
    } else {
      console.log("Brak postdownload — pomijam");
    }

    console.log("OK\n");
  }
})();
