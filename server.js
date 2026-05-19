const http = require("http");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const PORT = 3000;

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_GMAIL_APP_PASSWORD"
  }
});

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".pdf": "application/pdf"
};

const server = http.createServer((req, res) => {

  // CONTACT FORM API
  if (req.method === "POST" && req.url === "/send-message") {

    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {

      const data = JSON.parse(body);

      const mailOptions = {
        from: "YOUR_GMAIL@gmail.com",
        to: "YOUR_GMAIL@gmail.com",
        subject: `Portfolio Message from ${data.name}`,
        text: `
Name: ${data.name}

Email: ${data.email}

Message:
${data.message}
        `
      };

      try {
        await transporter.sendMail(mailOptions);

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: true,
          message: "Message sent successfully!"
        }));

      } catch (error) {

        res.writeHead(500, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: false,
          message: "Failed to send message"
        }));
      }
    });

    return;
  }

  // FILE SERVING
  let filePath = req.url === "/" ? "./index.html" : `.${req.url}`;

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || "text/plain";

  fs.readFile(filePath, (err, content) => {

    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": contentType
      });

      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});