import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jimp from "jimp";
import Joi from "joi";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.get("/", (req, res) => {
  res.send("This is a test page we don't serve things here!");
});

app.get("/jimp", (req, res) => {
  res.send({ msg: "Nothing to get -- yet." });
});

const jimpSchema = Joi.object({
  image: Joi.string(),
}).unknown(false);

app.post("/jimp/gaussian", async (req, res) => {
  const { error } = jimpSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  const { image } = req.body;
  const decodedImage = await jimp.read(
    Buffer.from(image.split(",")[1], "base64")
  );
  decodedImage.blur(5);
  res.send(await decodedImage.getBase64Async(jimp.AUTO));
});

export default app;
