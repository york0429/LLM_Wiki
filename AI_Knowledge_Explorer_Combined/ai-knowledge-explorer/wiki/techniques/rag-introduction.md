---
id: rag-introduction
title: "什麼是 RAG？"
category: techniques
difficulty: "入門"
stage: 3
summary: "理解檢索增強生成如何讓 AI 參考外部文件回答問題。"
minutes: 6
interaction_id: rag-introduction
quiz_id: rag-introduction
related: ["llm-introduction", "prompt-engineering"]
sources: ["src-0004"]
updated_at: 2026-11-15
---

## 概念介紹

RAG（Retrieval-Augmented Generation，檢索增強生成）是一種將「查詢外部資訊」與「語言模型生成」結合的方式。當使用者提出問題時，系統會先搜尋相關資料，再把資料提供給模型參考。

## 運作原理

常見流程為：接收問題、檢索文件、挑選相關片段、將片段和問題交給語言模型、生成回答。RAG 能讓回答利用外部內容，但**檢索到錯誤資料或模型理解失誤，仍可能產生錯誤回答**。

## 生活應用範例

校務問答系統可以先查詢選課規則，再依據找到的校方文件回答學生問題；使用者仍應檢查來源和適用學期。

## 互動探索

透過下方互動卡片，從另一個角度理解本節概念。

## 知識重點整理

- RAG 結合檢索與生成。
- 外部資料品質會影響答案品質。
- RAG 有助查證，但不保證完全正確。

## 知識小測驗

完成閱讀後，透過三題選擇題檢查自己的理解。

## 延伸閱讀

推薦閱讀下方的相關文章，串連不同 AI 概念。

## 參考資料

本篇依據所列來源整理為教學摘要，請以原始文件為準。

