---
id: llm-introduction
title: "什麼是大型語言模型（LLM）？"
category: generative-ai
difficulty: "入門"
stage: 2
summary: "從 Token 與下一段文字的預測，認識大型語言模型。"
minutes: 6
interaction_id: llm-introduction
quiz_id: llm-introduction
related: ["generative-ai", "prompt-engineering", "rag-introduction"]
sources: ["src-0002"]
updated_at: 2026-11-15
---

## 概念介紹

大型語言模型（Large Language Model，LLM）是經過大量文字資料訓練，能依照上下文處理與產生文字的模型。它可以協助摘要、回答問題、翻譯與程式撰寫，但仍可能犯錯。

## 運作原理

文字會先經過切分，形成稱為 Token 的處理單位。模型接收 Token 序列，利用訓練過程學到的模式預測接下來可能出現的 Token，逐步產生輸出。許多現代 LLM 採用 Transformer 架構，但不同模型的訓練方式與功能可能不同。

## 生活應用範例

使用者輸入「請用三句話解釋機器學習」，模型會根據指令和上下文生成一段回答。若問題涉及最新校規，沒有外部資料的模型可能無法可靠回答。

## 互動探索

透過下方互動卡片，從另一個角度理解本節概念。

## 知識重點整理

- LLM 是處理語言的模型，不等於知識資料庫。
- Token 是模型處理文字的單位。
- 模型可能產生錯誤答案，必要時需查證。

## 知識小測驗

完成閱讀後，透過三題選擇題檢查自己的理解。

## 延伸閱讀

推薦閱讀下方的相關文章，串連不同 AI 概念。

## 參考資料

本篇依據所列來源整理為教學摘要，請以原始文件為準。

