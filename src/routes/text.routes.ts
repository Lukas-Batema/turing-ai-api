import express from "express";
import { Request, Response } from "express";
import {
  chatGPT35,
  chatGPT3,
  getConversation,
  OpenAssistant,
  Alan,
} from "../modules/text/index.js";

const router = express.Router();

router.post("/chat/:model", async (req: Request, res: Response) => {
  var { model } = req.params;
  var { message, userName, conversationId } = req.body;
  if (model != "sd") {
    var conversation = await getConversation(conversationId, model);
  }
  if (model == "chatgpt") {
    let result = await chatGPT35(
      userName,
      conversation,
      message,
      conversationId
    );
    res.json(result).status(200);
  } else if (model == "gpt-3") {
    let result = await chatGPT3(
      userName,
      conversation,
      message,
      conversationId
    );
    res.json(result).status(200);
  } else if (model == "oa") {
    let result = await OpenAssistant(message);
    res.json(result).status(200);
  }
});
router.post("/alan/:model", async (req: Request, res: Response) => {
  var { model } = req.params;
  var {
    message,
    userName,
    conversationId,
    searchEngine,
    photo,
    imageGenerator,
  } = req.body;
  let conversation = await getConversation(conversationId, `alan-${model}`);
  let result = await Alan(
    userName,
    conversation,
    message,
    conversationId,
    model,
    searchEngine,
    photo,
    imageGenerator
  );
  res.json(result).status(200);
});

export default router;