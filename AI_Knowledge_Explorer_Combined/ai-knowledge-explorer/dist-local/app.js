// 此檔案由 scripts/build-standalone.mjs 產生，請勿手動修改。
const learningPath = {"id":"ai-beginner","title":"AI 初學者學習路線","stages":[{"id":"stage-1","number":1,"title":"認識人工智慧","description":"從 AI 的基本概念開始","article_ids":["ai-introduction","machine-learning"]},{"id":"stage-2","number":2,"title":"生成式 AI 的世界","description":"認識生成內容與大型語言模型","article_ids":["generative-ai","llm-introduction"]},{"id":"stage-3","number":3,"title":"AI 核心技術","description":"學習 Prompt 與 RAG 的方法","article_ids":["prompt-engineering","rag-introduction"]},{"id":"stage-4","number":4,"title":"AI 工具與應用","description":"了解 Agent 與聊天機器人","article_ids":["ai-agent","ai-chatbot"]},{"id":"stage-5","number":5,"title":"AI 安全與未來","description":"建立負責任的 AI 使用習慣","article_ids":["ai-hallucination","ai-privacy"]}]};
const sources = [{"source_id":"src-0001","author":"IBM","title":"What is artificial intelligence?","url":"https://www.ibm.com/think/topics/artificial-intelligence","description":"概念與人工智慧基本定義","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["ai-introduction","machine-learning","generative-ai"]},{"source_id":"src-0002","author":"Google for Developers","title":"Machine Learning Crash Course","url":"https://developers.google.com/machine-learning/crash-course","description":"機器學習、深度學習、神經網路及大型語言模型","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["machine-learning","generative-ai","llm-introduction"]},{"source_id":"src-0003","author":"Google AI for Developers","title":"提示設計策略","url":"https://ai.google.dev/gemini-api/docs/prompting-strategies?hl=zh-tw","description":"Prompt Engineering 的基本做法","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["prompt-engineering"]},{"source_id":"src-0004","author":"Lewis et al., NeurIPS 2020","title":"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks","url":"https://proceedings.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html","description":"RAG 原始研究與方法","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["rag-introduction"]},{"source_id":"src-0005","author":"Anthropic Engineering","title":"Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","description":"AI Agent 與工作流程的差別","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["ai-agent"]},{"source_id":"src-0006","author":"IBM","title":"What is a chatbot?","url":"https://www.ibm.com/think/topics/chatbots","description":"聊天機器人類型與應用","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["ai-chatbot"]},{"source_id":"src-0007","author":"NIST","title":"AI Risk Management Framework","url":"https://www.nist.gov/itl/ai-risk-management-framework","description":"AI 風險與治理","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["ai-hallucination","ai-privacy"]},{"source_id":"src-0008","author":"NIST","title":"Generative AI Profile (AI 600-1)","url":"https://nvlpubs.nist.gov/nistpubs/AI/NIST.AI.600-1.pdf","description":"幻覺與個資隱私風險","type":"official_or_research","published_at":null,"collected_at":"2026-11-15","status":"pending","related_articles":["ai-hallucination","ai-privacy"]}];
const rawArticles = {"../wiki/basics/ai-introduction.md":"---\nid: ai-introduction\ntitle: \"什麼是人工智慧？\"\ncategory: basics\ndifficulty: \"入門\"\nstage: 1\nsummary: \"從生活中的推薦系統、語音辨識開始，理解 AI 的基本概念。\"\nminutes: 5\ninteraction_id: ai-introduction\nquiz_id: ai-introduction\nrelated: [\"machine-learning\", \"generative-ai\"]\nsources: [\"src-0001\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\n人工智慧（Artificial Intelligence，AI）是讓電腦系統完成某些原本需要人類智慧才能處理的任務的技術領域，例如辨識影像、理解文字、預測或協助決策。**AI 並不等於有自我意識的機器**；多數現實中的 AI 都是針對特定任務建立的系統。\n\n## 運作原理\n\nAI 的做法很多。有些系統使用明確的規則，有些則透過大量資料中的模式來學習。先定義問題、準備適當資料、建立模型或規則，再用測試資料檢查結果，是理解 AI 專案的實用方式。\n\n## 生活應用範例\n\n影片平台會根據觀看紀錄推薦內容；手機可以辨識語音；郵件服務能協助過濾垃圾信。這些功能都可能使用不同形式的 AI。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- AI 是一個廣泛領域，不只有聊天機器人。\n- 機器學習是實現 AI 的其中一種方式。\n- AI 的輸出可能出錯，需要評估及適當的人類監督。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/basics/machine-learning.md":"---\nid: machine-learning\ntitle: \"機器學習與深度學習\"\ncategory: basics\ndifficulty: \"入門\"\nstage: 1\nsummary: \"理解機器學習、深度學習與人工智慧的包含關係。\"\nminutes: 6\ninteraction_id: machine-learning\nquiz_id: machine-learning\nrelated: [\"ai-introduction\", \"llm-introduction\"]\nsources: [\"src-0001\", \"src-0002\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\n機器學習（Machine Learning）讓系統從資料中學習模式，再用這些模式處理新資料。深度學習（Deep Learning）是機器學習的一個分支，常使用多層神經網路。\n\n## 運作原理\n\n可以把它想成三層關係：**人工智慧包含機器學習，機器學習包含深度學習**。例如一般的分類模型可能從幾個特徵學習規則，而深度神經網路能從大量資料中學習更複雜的表徵。兩者都需要適當資料、評估及檢查偏差。\n\n## 生活應用範例\n\n用歷年房價資料預測價格，可能採用機器學習；辨識照片中的不同物件，則常採用深度學習模型，但不是每個問題都需要最複雜的模型。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- AI、機器學習、深度學習是包含關係。\n- 深度學習通常透過多層神經網路學習。\n- 資料品質與評估方式比模型名稱更重要。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/generative-ai/generative-ai.md":"---\nid: generative-ai\ntitle: \"什麼是生成式 AI？\"\ncategory: generative-ai\ndifficulty: \"入門\"\nstage: 2\nsummary: \"認識 AI 如何根據指令產生文字、圖片等新內容。\"\nminutes: 5\ninteraction_id: generative-ai\nquiz_id: generative-ai\nrelated: [\"ai-introduction\", \"llm-introduction\"]\nsources: [\"src-0001\", \"src-0002\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\n生成式 AI（Generative AI）是能依據輸入與學習到的資料模式，產生文字、圖片、音訊或其他內容的一類 AI 技術。它與只做分類或預測的系統相比，更強調「產生內容」。\n\n## 運作原理\n\n生成式模型在訓練時學習資料中的統計模式；使用者提供指令後，模型再根據上下文生成回應。不同模型支援的輸入與輸出形式各不相同。**生成得流暢不代表內容真實**，仍需查核重要事實。\n\n## 生活應用範例\n\n你可以請生成式 AI 把一段艱澀的文章改寫成適合初學者的說明，或產生一封邀請信的草稿，再自行檢查與修改。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- 生成式 AI 的核心是產生內容。\n- 輸入指令會影響輸出形式與細節。\n- 文字通順不等於正確，重要資訊要查核。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/generative-ai/llm-introduction.md":"---\nid: llm-introduction\ntitle: \"什麼是大型語言模型（LLM）？\"\ncategory: generative-ai\ndifficulty: \"入門\"\nstage: 2\nsummary: \"從 Token 與下一段文字的預測，認識大型語言模型。\"\nminutes: 6\ninteraction_id: llm-introduction\nquiz_id: llm-introduction\nrelated: [\"generative-ai\", \"prompt-engineering\", \"rag-introduction\"]\nsources: [\"src-0002\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\n大型語言模型（Large Language Model，LLM）是經過大量文字資料訓練，能依照上下文處理與產生文字的模型。它可以協助摘要、回答問題、翻譯與程式撰寫，但仍可能犯錯。\n\n## 運作原理\n\n文字會先經過切分，形成稱為 Token 的處理單位。模型接收 Token 序列，利用訓練過程學到的模式預測接下來可能出現的 Token，逐步產生輸出。許多現代 LLM 採用 Transformer 架構，但不同模型的訓練方式與功能可能不同。\n\n## 生活應用範例\n\n使用者輸入「請用三句話解釋機器學習」，模型會根據指令和上下文生成一段回答。若問題涉及最新校規，沒有外部資料的模型可能無法可靠回答。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- LLM 是處理語言的模型，不等於知識資料庫。\n- Token 是模型處理文字的單位。\n- 模型可能產生錯誤答案，必要時需查證。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/techniques/prompt-engineering.md":"---\nid: prompt-engineering\ntitle: \"Prompt Engineering 入門\"\ncategory: techniques\ndifficulty: \"入門\"\nstage: 3\nsummary: \"學會提供清楚目標、背景與格式，改善 AI 的回應。\"\nminutes: 5\ninteraction_id: prompt-engineering\nquiz_id: prompt-engineering\nrelated: [\"llm-introduction\", \"rag-introduction\"]\nsources: [\"src-0003\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\nPrompt Engineering（提示工程）是設計和改善輸入指令的方法，目的在於讓模型更清楚理解任務、背景、限制與希望的輸出格式。它不是魔法指令，也不能保證每次回答都正確。\n\n## 運作原理\n\n設計提示時，可以依序提供：**目標、背景、限制、輸出格式**。如果結果不理想，檢查是指令不清楚、資料不足還是需要範例，再逐步調整。對高風險資訊仍需查核。\n\n## 生活應用範例\n\n模糊提示：「介紹 AI」。明確提示：「以繁體中文，用三個生活例子向國中生介紹 AI，最後整理三個重點」。後者對內容與格式的要求更清楚。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- 明確說明任務與對象。\n- 提供必要背景和限制。\n- 指定輸出格式，並檢查生成結果。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/techniques/rag-introduction.md":"---\nid: rag-introduction\ntitle: \"什麼是 RAG？\"\ncategory: techniques\ndifficulty: \"入門\"\nstage: 3\nsummary: \"理解檢索增強生成如何讓 AI 參考外部文件回答問題。\"\nminutes: 6\ninteraction_id: rag-introduction\nquiz_id: rag-introduction\nrelated: [\"llm-introduction\", \"prompt-engineering\"]\nsources: [\"src-0004\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\nRAG（Retrieval-Augmented Generation，檢索增強生成）是一種將「查詢外部資訊」與「語言模型生成」結合的方式。當使用者提出問題時，系統會先搜尋相關資料，再把資料提供給模型參考。\n\n## 運作原理\n\n常見流程為：接收問題、檢索文件、挑選相關片段、將片段和問題交給語言模型、生成回答。RAG 能讓回答利用外部內容，但**檢索到錯誤資料或模型理解失誤，仍可能產生錯誤回答**。\n\n## 生活應用範例\n\n校務問答系統可以先查詢選課規則，再依據找到的校方文件回答學生問題；使用者仍應檢查來源和適用學期。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- RAG 結合檢索與生成。\n- 外部資料品質會影響答案品質。\n- RAG 有助查證，但不保證完全正確。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/applications/ai-agent.md":"---\nid: ai-agent\ntitle: \"什麼是 AI Agent？\"\ncategory: applications\ndifficulty: \"入門\"\nstage: 4\nsummary: \"了解 AI Agent 如何根據目標規劃步驟並使用工具。\"\nminutes: 6\ninteraction_id: ai-agent\nquiz_id: ai-agent\nrelated: [\"ai-chatbot\", \"llm-introduction\"]\nsources: [\"src-0005\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\nAI Agent（AI 代理）通常指能為了完成目標，根據環境資訊選擇步驟、使用工具並檢查結果的 AI 系統。不同產品對 Agent 的定義不完全相同，需要看具體功能。\n\n## 運作原理\n\n一般工作流程可能是：接收目標、規劃行動、呼叫工具、檢查回傳結果，再決定下一步。和單純照預先固定路徑執行的工作流程相比，Agent 在部分步驟具有較多動態決策能力。\n\n## 生活應用範例\n\n你可以讓一個具備授權工具的 Agent 整理多份公開文件、歸納重點並產生摘要。工具權限與結果驗證十分重要。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- Agent 著重目標、行動與回饋。\n- 不一定所有多步驟自動化都要稱為 Agent。\n- 需要清楚權限、限制與檢查機制。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/applications/ai-chatbot.md":"---\nid: ai-chatbot\ntitle: \"AI 聊天機器人的應用\"\ncategory: applications\ndifficulty: \"入門\"\nstage: 4\nsummary: \"比較規則式與生成式聊天機器人，了解常見使用情境。\"\nminutes: 5\ninteraction_id: ai-chatbot\nquiz_id: ai-chatbot\nrelated: [\"ai-agent\", \"generative-ai\"]\nsources: [\"src-0006\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\n聊天機器人（Chatbot）是一種讓使用者透過文字或語音與軟體互動的應用。並非所有聊天機器人都使用大型語言模型：有些按照固定規則運作，有些則結合 NLP 或生成式 AI。\n\n## 運作原理\n\n規則式聊天機器人適合選項清楚、流程穩定的任務；生成式聊天機器人更擅長自然語言對話及彈性回答，但也更需要內容檢查與資料保護。\n\n## 生活應用範例\n\n網站客服可以先提供固定的退貨流程選項；進一步的 AI 聊天機器人可依使用者敘述整理需求，再把問題轉交給對應窗口。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- 聊天機器人不一定使用生成式 AI。\n- 規則式與生成式各有適合的情境。\n- 對話內容可能涉及個資，應重視資料保護。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/safety/ai-hallucination.md":"---\nid: ai-hallucination\ntitle: \"什麼是 AI 幻覺？\"\ncategory: safety\ndifficulty: \"入門\"\nstage: 5\nsummary: \"理解 AI 為何可能給出流暢但錯誤的資訊。\"\nminutes: 5\ninteraction_id: ai-hallucination\nquiz_id: ai-hallucination\nrelated: [\"ai-privacy\", \"llm-introduction\"]\nsources: [\"src-0008\", \"src-0007\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\nAI 幻覺（Hallucination）是指生成式 AI 產生看似合理、但內容不正確或缺乏事實依據的回應。例如模型可能編造不存在的書名、資料來源或日期。\n\n## 運作原理\n\n語言模型的文字生成不等同於逐項查證資料庫，因此可能在資料不足、提問含糊或生成過程中犯錯。改善方式包括提供可信來源、使用檢索輔助、要求來源連結，並由人核查重要結論。\n\n## 生活應用範例\n\n如果問 AI「某篇論文的 DOI 是什麼」，得到一個格式很像 DOI 的字串，仍應到實際論文網站確認，而不是直接引用。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- 流暢的回答也可能是錯誤資訊。\n- 確認引用與來源是否真的存在。\n- RAG 可以協助降低某些問題，但不是完全保證。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n","../wiki/safety/ai-privacy.md":"---\nid: ai-privacy\ntitle: \"AI 與資料隱私\"\ncategory: safety\ndifficulty: \"入門\"\nstage: 5\nsummary: \"認識使用 AI 工具時的個資風險與安全習慣。\"\nminutes: 5\ninteraction_id: ai-privacy\nquiz_id: ai-privacy\nrelated: [\"ai-hallucination\", \"ai-chatbot\"]\nsources: [\"src-0007\", \"src-0008\"]\nupdated_at: 2026-11-15\n---\n\n## 概念介紹\n\nAI 工具可能接觸使用者輸入的文字、文件或其他資料。當資料包含姓名、聯絡方式、帳號或其他敏感資訊時，使用者應理解工具如何處理與保存資料，避免不必要的揭露。\n\n## 運作原理\n\n可採取的基本原則包括：輸入前檢查是否含個資、只提供完成任務必要的資料、確認服務的隱私設定與資料保留政策，以及避免將機密檔案上傳到不適合的平台。不同 AI 服務的資料處理方式並不相同。\n\n## 生活應用範例\n\n如果只是想請 AI 修改一封公告，可以先移除真實姓名、電話與學號，再使用示範資料完成文字潤飾。\n\n## 互動探索\n\n透過下方互動卡片，從另一個角度理解本節概念。\n\n## 知識重點整理\n\n- 只提供完成任務需要的最少資料。\n- 確認服務條款、隱私政策與保存方式。\n- 公開分享 AI 生成內容前也要檢查是否包含個資。\n\n## 知識小測驗\n\n完成閱讀後，透過三題選擇題檢查自己的理解。\n\n## 延伸閱讀\n\n推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n## 參考資料\n\n本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n"};
const allInteractions = {"../interactions/ai-introduction.json":{"id":"ai-introduction","article_id":"ai-introduction","type":"flashcard","question":"AI 一定要像人類一樣思考嗎？","answer":"不需要。AI 可以在特定任務上表現出智能行為，並不代表具有與人相同的思考方式。","explanation":"辨識影像與預測文字都屬於 AI 應用，但運作機制可能非常不同。"},"../interactions/machine-learning.json":{"id":"machine-learning","article_id":"machine-learning","type":"comparison","title":"兩種學習方法比較","option_a":{"label":"機器學習","description":"範圍較廣，包含決策樹、線性模型與神經網路等多種方法。"},"option_b":{"label":"深度學習","description":"機器學習的分支，通常使用多層神經網路學習複雜模式。"},"conclusion":"深度學習不是 AI 的全部，也不代表一定比其他方法適合每個任務。"},"../interactions/generative-ai.json":{"id":"generative-ai","article_id":"generative-ai","type":"flashcard","question":"生成式 AI 和一般分類模型最大的不同是什麼？","answer":"生成式 AI 能產生新的內容，例如文字或圖片。","explanation":"分類模型通常從既有選項做判斷；生成式模型則生成符合條件的輸出。"},"../interactions/llm-introduction.json":{"id":"llm-introduction","article_id":"llm-introduction","type":"step-flow","title":"LLM 如何產生文字？","steps":[{"title":"收到提示","description":"使用者提供問題、任務或上下文。"},{"title":"轉成 Token","description":"文字被切分成模型可處理的單位。"},{"title":"預測接續 Token","description":"模型依上下文估計下一個 Token 的可能性。"},{"title":"逐步形成回覆","description":"反覆產生後續 Token，直到形成結果。"}]},"../interactions/prompt-engineering.json":{"id":"prompt-engineering","article_id":"prompt-engineering","type":"comparison","title":"兩種 Prompt 寫法","option_a":{"label":"模糊指令","description":"「介紹人工智慧。」缺少對象、長度和預期格式。"},"option_b":{"label":"清楚指令","description":"「用繁體中文、兩個生活例子，寫約 150 字介紹 AI，最後列出三個重點。」"},"conclusion":"清楚的指令有助模型掌握需求，但仍需要評估內容正確性。"},"../interactions/rag-introduction.json":{"id":"rag-introduction","article_id":"rag-introduction","type":"step-flow","title":"RAG 的四個步驟","steps":[{"title":"提出問題","description":"使用者詢問「學校的選課規定是什麼？」"},{"title":"檢索資料","description":"系統從文件集中搜尋與選課相關的內容。"},{"title":"提供參考","description":"將相關段落與使用者問題一起提供給模型。"},{"title":"產生回答","description":"模型根據參考內容回答，並可附來源供查證。"}]},"../interactions/ai-agent.json":{"id":"ai-agent","article_id":"ai-agent","type":"step-flow","title":"AI Agent 的循環","steps":[{"title":"接收目標","description":"例如「整理指定主題的公開資料」。"},{"title":"規劃步驟","description":"依目標決定要找哪些資訊與使用哪些工具。"},{"title":"執行工具","description":"在允許的權限內搜尋資料或處理文件。"},{"title":"檢查結果","description":"檢查工具輸出是否符合目標與限制。"},{"title":"完成或調整","description":"達到條件就完成，否則調整後繼續。"}]},"../interactions/ai-chatbot.json":{"id":"ai-chatbot","article_id":"ai-chatbot","type":"comparison","title":"兩種聊天機器人比較","option_a":{"label":"規則式","description":"依預設選單或關鍵字回覆，對固定流程較可預期。"},"option_b":{"label":"生成式 AI","description":"可根據自然語言生成較有彈性的回答，但可能出現錯誤。"},"conclusion":"選擇方式應取決於任務的彈性、風險與可控性。"},"../interactions/ai-hallucination.json":{"id":"ai-hallucination","article_id":"ai-hallucination","type":"comparison","title":"如何看待 AI 回答？","option_a":{"label":"直接相信","description":"看到有條理的答案就直接轉貼，可能把編造的事實當真。"},"option_b":{"label":"交叉查證","description":"確認原始來源、日期、適用範圍，再使用重要資訊。"},"conclusion":"對學術、醫療、法律等重要資訊，更需要額外查核。"},"../interactions/ai-privacy.json":{"id":"ai-privacy","article_id":"ai-privacy","type":"flashcard","question":"將真實學號和電話貼給 AI 前，最適合先做什麼？","answer":"先確認是否真的需要這些資料；通常可以刪除或改成範例資料。","explanation":"資料最小化可以減少不必要的個人資訊暴露。"}};
const allQuizzes = {"../quizzes/ai-introduction.json":{"id":"ai-introduction","article_id":"ai-introduction","version":1,"questions":[{"question_id":"ai-introduction-q1","article_id":"ai-introduction","version":1,"question":"以下哪一項最貼近人工智慧的定義？","options":["只能儲存檔案的電腦","讓電腦執行某些需要智慧的任務","每台電腦都有的作業系統","一定具有自我意識的機器"],"answer":1,"explanation":"AI 是技術領域，不要求系統擁有自我意識。"},{"question_id":"ai-introduction-q2","article_id":"ai-introduction","version":1,"question":"哪個例子可能用到 AI？","options":["推薦影片","更換滑鼠電池","關閉電源","插上網路線"],"answer":0,"explanation":"推薦系統可能學習使用者偏好來排序內容。"},{"question_id":"ai-introduction-q3","article_id":"ai-introduction","version":1,"question":"關於 AI，哪個說法較恰當？","options":["任何輸出都正確","只能製作圖片","可能需要測試及人類監督","AI 就是機器人外殼"],"answer":2,"explanation":"模型有錯誤風險，應以測試與監督確認使用效果。"}]},"../quizzes/machine-learning.json":{"id":"machine-learning","article_id":"machine-learning","version":1,"questions":[{"question_id":"machine-learning-q1","article_id":"machine-learning","version":1,"question":"深度學習和機器學習的關係為何？","options":["完全無關","深度學習包含所有 AI","深度學習是機器學習的一部分","兩者都是作業系統"],"answer":2,"explanation":"深度學習是機器學習的分支。"},{"question_id":"machine-learning-q2","article_id":"machine-learning","version":1,"question":"哪一種技術常以多層神經網路為核心？","options":["深度學習","電子郵件協定","資料備份","檔案壓縮"],"answer":0,"explanation":"深度學習常使用具有多層結構的神經網路。"},{"question_id":"machine-learning-q3","article_id":"machine-learning","version":1,"question":"選擇機器學習方法時，重要的是？","options":["只選名字最新的","考量資料與任務需求","永遠使用最大模型","不需要測試"],"answer":1,"explanation":"模型應符合任務、資料與評估需求。"}]},"../quizzes/generative-ai.json":{"id":"generative-ai","article_id":"generative-ai","version":1,"questions":[{"question_id":"generative-ai-q1","article_id":"generative-ai","version":1,"question":"哪一項是生成式 AI 常見用途？","options":["產生文章草稿","更換電腦電池","增加螢幕亮度","清理鍵盤"],"answer":0,"explanation":"生成式 AI 可根據提示生成文字。"},{"question_id":"generative-ai-q2","article_id":"generative-ai","version":1,"question":"生成式 AI 產出的文字一定正確嗎？","options":["一定","不一定，需要核對重要事實","只有英文才正確","無法產生文字"],"answer":1,"explanation":"生成過程可能出現虛構或錯誤資訊。"},{"question_id":"generative-ai-q3","article_id":"generative-ai","version":1,"question":"提示詞的角色是？","options":["取代硬碟","降低螢幕解析度","提供模型任務與上下文","永遠保證答案正確"],"answer":2,"explanation":"提示詞會提供任務、條件與背景。"}]},"../quizzes/llm-introduction.json":{"id":"llm-introduction","article_id":"llm-introduction","version":1,"questions":[{"question_id":"llm-introduction-q1","article_id":"llm-introduction","version":1,"question":"LLM 的主要用途為何？","options":["處理與產生語言內容","替換實體硬碟","加速風扇運轉","只顯示圖片"],"answer":0,"explanation":"LLM 在語言理解與生成相關任務上有廣泛應用。"},{"question_id":"llm-introduction-q2","article_id":"llm-introduction","version":1,"question":"Token 是什麼？","options":["唯一的 AI 品牌","文字處理的單位","電腦螢幕尺寸","網路密碼"],"answer":1,"explanation":"文字會轉換成 Token 供模型處理。"},{"question_id":"llm-introduction-q3","article_id":"llm-introduction","version":1,"question":"對 LLM 回答的適當態度是？","options":["總是相信","不看來源就引用","重要資訊進一步查核","完全不能使用"],"answer":2,"explanation":"LLM 可能出錯，重要事實需要查證。"}]},"../quizzes/prompt-engineering.json":{"id":"prompt-engineering","article_id":"prompt-engineering","version":1,"questions":[{"question_id":"prompt-engineering-q1","article_id":"prompt-engineering","version":1,"question":"哪個提示較清楚？","options":["介紹一下","隨便寫","用繁體中文列出三個 AI 應用並各舉一例","你知道嗎"],"answer":2,"explanation":"具體的語言、數量、內容與格式更容易執行。"},{"question_id":"prompt-engineering-q2","article_id":"prompt-engineering","version":1,"question":"提示工程主要是在做什麼？","options":["設計與調整輸入指令","更換電腦零件","發明新鍵盤","保證答案永不出錯"],"answer":0,"explanation":"提示工程改善與模型溝通的方式。"},{"question_id":"prompt-engineering-q3","article_id":"prompt-engineering","version":1,"question":"模型回答不理想時，合理做法是？","options":["永遠不再使用","補充背景、範例或限制再調整","把字全部刪掉","直接視為事實"],"answer":1,"explanation":"調整提示可改善方向，但仍應查核答案。"}]},"../quizzes/rag-introduction.json":{"id":"rag-introduction","article_id":"rag-introduction","version":1,"questions":[{"question_id":"rag-introduction-q1","article_id":"rag-introduction","version":1,"question":"RAG 最主要結合哪兩件事？","options":["畫圖與錄影","資料檢索與語言生成","列印與掃描","音量與亮度"],"answer":1,"explanation":"RAG 在生成回答前檢索相關外部資料。"},{"question_id":"rag-introduction-q2","article_id":"rag-introduction","version":1,"question":"RAG 一定能保證回答正確嗎？","options":["不能，來源或生成仍可能出錯","一定能","只要有網路就一定能","不需要文件"],"answer":0,"explanation":"RAG 仍取決於檢索與生成品質。"},{"question_id":"rag-introduction-q3","article_id":"rag-introduction","version":1,"question":"哪個情境適合 RAG？","options":["調整螢幕亮度","更換鍵盤","依據校方文件回答選課問題","替手機充電"],"answer":2,"explanation":"RAG 擅長需要參照外部文件的知識問答。"}]},"../quizzes/ai-agent.json":{"id":"ai-agent","article_id":"ai-agent","version":1,"questions":[{"question_id":"ai-agent-q1","article_id":"ai-agent","version":1,"question":"AI Agent 常見的特色為何？","options":["只能播放音樂","可依目標使用工具並檢查結果","只能顯示圖片","不會犯錯"],"answer":1,"explanation":"AI Agent 通常結合目標、工具使用與回饋。"},{"question_id":"ai-agent-q2","article_id":"ai-agent","version":1,"question":"Agent 使用外部工具時重要的是？","options":["不設定權限","完全不檢查","權限控管與結果驗證","永遠允許所有操作"],"answer":2,"explanation":"授權與檢查可降低不當操作的風險。"},{"question_id":"ai-agent-q3","article_id":"ai-agent","version":1,"question":"AI Agent 與固定工作流程的常見差異？","options":["可能動態決定部分步驟","Agent 一定不需要模型","固定流程一定更危險","兩者完全一樣"],"answer":0,"explanation":"Agent 通常更常依情況動態決策。"}]},"../quizzes/ai-chatbot.json":{"id":"ai-chatbot","article_id":"ai-chatbot","version":1,"questions":[{"question_id":"ai-chatbot-q1","article_id":"ai-chatbot","version":1,"question":"所有聊天機器人都使用 LLM 嗎？","options":["是","不是，有些是規則式","只有電話裡的才有","只有英文聊天機器人才有"],"answer":1,"explanation":"聊天機器人可以用規則或不同 AI 技術實作。"},{"question_id":"ai-chatbot-q2","article_id":"ai-chatbot","version":1,"question":"規則式聊天機器人較適合？","options":["固定選單與流程","無限制開放式推理","自動保證所有事實","不需要任何設計"],"answer":0,"explanation":"可預期的固定流程適合規則式實作。"},{"question_id":"ai-chatbot-q3","article_id":"ai-chatbot","version":1,"question":"使用聊天機器人時需要注意？","options":["只要能聊天就安全","一定會記住所有內容","個資與回答正確性","不必檢查資訊"],"answer":2,"explanation":"重要資訊與個人資料都應謹慎處理。"}]},"../quizzes/ai-hallucination.json":{"id":"ai-hallucination","article_id":"ai-hallucination","version":1,"questions":[{"question_id":"ai-hallucination-q1","article_id":"ai-hallucination","version":1,"question":"AI 幻覺指的是什麼？","options":["產生錯誤或缺乏依據的內容","螢幕閃爍","顯示器亮度過高","使用者做夢"],"answer":0,"explanation":"幻覺指模型生成不正確或無根據的內容。"},{"question_id":"ai-hallucination-q2","article_id":"ai-hallucination","version":1,"question":"模型列出論文網址後應該？","options":["直接相信","確認網址與論文是否真實存在","只看標題長度","忽略作者"],"answer":1,"explanation":"形式看似專業不代表來源真的存在。"},{"question_id":"ai-hallucination-q3","article_id":"ai-hallucination","version":1,"question":"哪個行為有助降低誤用錯誤資訊？","options":["只看一份 AI 答案","完全不看來源","核對可信來源","要求回答一定正確"],"answer":2,"explanation":"交叉查證是重要的使用習慣。"}]},"../quizzes/ai-privacy.json":{"id":"ai-privacy","article_id":"ai-privacy","version":1,"questions":[{"question_id":"ai-privacy-q1","article_id":"ai-privacy","version":1,"question":"將個人資料交給 AI 前，較好的做法是？","options":["全部照貼","確認必要性並刪除無關個資","完全不看平台政策","分享所有密碼"],"answer":1,"explanation":"只使用必要資料有助降低風險。"},{"question_id":"ai-privacy-q2","article_id":"ai-privacy","version":1,"question":"哪項屬於可能敏感的內容？","options":["公開的天氣預報","一般的數學公式","未公開的帳號密碼","常見英文單字"],"answer":2,"explanation":"帳號密碼等資訊不應隨意輸入外部工具。"},{"question_id":"ai-privacy-q3","article_id":"ai-privacy","version":1,"question":"不同 AI 工具的資料保存方式？","options":["一定完全一樣","一定不保存","需要依各服務政策確認","一定可以公開分享"],"answer":2,"explanation":"隱私政策與資料處理方式因服務而異。"}]}};






const categoryInfo = {
  basics: { name: 'AI 基礎知識', icon: '✦', description: '從零開始理解人工智慧與機器學習。' },
  'generative-ai': { name: '生成式 AI', icon: '✧', description: '探索 LLM 與內容生成的基本概念。' },
  techniques: { name: 'AI 核心技術', icon: '⌘', description: '透過範例學習 Prompt、RAG 等方法。' },
  applications: { name: 'AI 工具與應用', icon: '◇', description: '認識 Agent、聊天機器人與實際情境。' },
  safety: { name: 'AI 安全與未來', icon: '◈', description: '建立可靠且注意隱私的 AI 使用習慣。' },
};
const stages = learningPath.stages;
const sourceById = Object.fromEntries(sources.map(s => [s.source_id, s]));

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error('缺少 YAML frontmatter');
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') || value.startsWith('"')) {
      try { value = JSON.parse(value); } catch { /* keep literal */ }
    } else if (/^\d+$/.test(value)) {
      value = Number(value);
    }
    meta[key] = value;
  }
  return { meta, body: text.slice(match[0].length).trim() };
}

function splitSections(body) {
  const map = {};
  const regex = /^## (.+)\r?\n/gm;
  const matches = Array.from(body.matchAll(regex));
  matches.forEach((match, idx) => {
    const start = match.index + match[0].length;
    const end = matches[idx + 1]?.index ?? body.length;
    map[match[1].trim()] = body.slice(start, end).trim();
  });
  return map;
}

const articles = Object.entries(rawArticles).map(([path, markdown]) => {
  const { meta, body } = parseFrontmatter(markdown);
  const sections = splitSections(body);
  const interaction = allInteractions[`../interactions/${meta.interaction_id}.json`];
  const quiz = allQuizzes[`../quizzes/${meta.quiz_id}.json`];
  return { ...meta, body, sections, path, interaction, quiz, categoryName: categoryInfo[meta.category]?.name ?? meta.category };
}).sort((a, b) => a.stage - b.stage || a.title.localeCompare(b.title, 'zh-Hant'));

const articleById = Object.fromEntries(articles.map(article => [article.id, article]));
const categoryOrder = Object.keys(categoryInfo);

function getStage(article) {
  return stages.find(stage => stage.number === article.stage);
}

function getStageArticles(stage) {
  return stage.article_ids.map(id => articleById[id]).filter(Boolean);
}

const KEY = 'ai-explorer.learning.v1';
let fallback = {};

function readProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { opened: {}, completed: {}, scores: {} };
    const data = JSON.parse(raw);
    return { opened: data.opened || {}, completed: data.completed || {}, scores: data.scores || {} };
  } catch {
    return { opened: fallback.opened || {}, completed: fallback.completed || {}, scores: fallback.scores || {} };
  }
}
function writeProgress(data) {
  fallback = data;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* nonpersistent mode */ }
}
function markOpened(id) {
  const data = readProgress();
  if (!data.opened[id]) {
    data.opened[id] = true;
    writeProgress(data);
  }
}
function setCompleted(id, value) {
  const data = readProgress();
  if (value) data.completed[id] = true;
  else delete data.completed[id];
  writeProgress(data);
}
function saveScore(key, correct, total) {
  const data = readProgress();
  const previous = data.scores[key];
  if (!previous || correct / total > previous.correct / previous.total) {
    data.scores[key] = { correct, total, savedAt: new Date().toISOString() };
    writeProgress(data);
  }
}




const app = document.getElementById('app');
const state = { category: 'all', keyword: '', difficulty: 'all', learningTab: 'all', menuOpen: false, interaction: {}, quizSession: null };
const sectionTitles = ['概念介紹', '運作原理', '生活應用範例', '互動探索', '知識重點整理', '知識小測驗', '延伸閱讀', '參考資料'];
const htmlEscape = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const safeUrl = value => /^https:\/\//i.test(value || '') ? value : '';
const escapeAttr = htmlEscape;

function inlineMarkdown(raw) {
  const escaped = htmlEscape(raw);
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
function contentHTML(raw = '') {
  return raw.split(/\n\s*\n/).map(block => {
    const lines = block.trim().split('\n');
    if (!block.trim()) return '';
    if (lines.every(line => /^[-*] /.test(line))) return `<ul class="prose-list">${lines.map(line=>`<li>${inlineMarkdown(line.replace(/^[-*] /,''))}</li>`).join('')}</ul>`;
    return `<p>${lines.map(inlineMarkdown).join('<br>')}</p>`;
  }).join('');
}
function route() {
  const hash = location.hash.startsWith('#/') ? location.hash.slice(2) : 'home';
  const [page = 'home', ...rest] = hash.split('/');
  return { page, id: decodeURIComponent(rest.join('/')) };
}
function percent(done,total) { return total ? Math.round(done / total * 100) : 0; }
function completedCount(ids, progress) { return ids.filter(id => progress.completed[id]).length; }
function totalDone(progress) { return articles.filter(a => progress.completed[a.id]).length; }
function scoreText(score) { return score ? `${score.correct}/${score.total}` : '尚未測驗'; }
function navHref(page) { return `#/${page}`; }
function currentArticle(id) { return articleById[id]; }
function cateBadge(category) { return `<span class="pill pill-light">${htmlEscape(categoryInfo[category]?.name || category)}</span>`; }
function statusBadge(article, progress) {
  if (progress.completed[article.id]) return '<span class="pill pill-done">✓ 已完成</span>';
  if (progress.opened[article.id]) return '<span class="pill pill-progress">閱讀中</span>';
  return '<span class="pill pill-muted">尚未開始</span>';
}
function progressBar(done,total,extra='') { return `<div class="progress-track ${extra}" role="progressbar" aria-valuenow="${percent(done,total)}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${percent(done,total)}%"></div></div>`; }
function card(article, progress, compact=false) {
  return `<a class="article-card ${compact?'article-card-compact':''}" href="#/article/${encodeURIComponent(article.id)}">
      <div class="card-header"><span class="pill pill-light">${htmlEscape(article.categoryName)}</span><span class="small-meta">${htmlEscape(article.minutes)} 分鐘</span></div>
      <div class="card-glyph" aria-hidden="true">${categoryInfo[article.category]?.icon || '✧'}</div>
      <h3>${htmlEscape(article.title)}</h3><p>${htmlEscape(article.summary)}</p>
      <div class="card-footer"><span class="small-meta">${htmlEscape(article.difficulty)} · 階段 ${article.stage}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
    </a>`;
}
function header(page) {
  const links = [['home','首頁'],['explore','知識探索'],['path','學習路線'],['challenge','知識挑戰'],['learning','我的學習']];
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="#/home" aria-label="AI Explorer 首頁"><span class="brand-mark">✦</span><span class="brand-type">AI <strong>Explorer</strong><small>知識探索百科</small></span></a>
      <nav class="header-nav ${state.menuOpen?'is-open':''}" aria-label="主要導覽">${links.map(([id,title])=>`<a href="#/${id}" class="${page===id?'is-active':''}" ${page===id?'aria-current="page"':''}>${title}</a>`).join('')}</nav>
      <div class="header-actions"><a class="search-shortcut" href="#/explore" aria-label="搜尋文章">⌕</a><button class="menu-toggle" type="button" data-action="toggle-menu" aria-expanded="${state.menuOpen}" aria-label="${state.menuOpen?'關閉':'開啟'}導覽選單">${state.menuOpen?'✕':'☰'}</button></div></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-inner"><div><strong>✦ AI Explorer</strong><p>用簡單的方式，探索 AI 的無限可能。</p></div><div class="footer-links"><a href="#/about">關於本站</a><a href="#/explore">知識索引</a><span>繁體中文 · 學習示範專案</span></div></div></footer>`;
}
function pageHero(eyebrow,title,description) {
  return `<section class="page-hero"><span class="eyebrow">${htmlEscape(eyebrow)}</span><h1>${htmlEscape(title)}</h1><p>${htmlEscape(description)}</p></section>`;
}
function homePage(progress) {
  const done = totalDone(progress);
  const pending = articles.find(a => progress.opened[a.id] && !progress.completed[a.id]) || articles.find(a => !progress.completed[a.id]) || articles[0];
  const first = articles.filter(a => a.stage < 3).slice(0,3);
  return `<main id="main" tabindex="-1">
    <section class="home-hero"><div class="hero-glow hero-glow-one"></div><div class="hero-glow hero-glow-two"></div>
      <div class="hero-content"><span class="eyebrow"><span class="eyebrow-dot"></span> AI KNOWLEDGE EXPLORER</span>
      <h1>探索 AI，<br><span class="gradient-text">從這裡開始。</span></h1>
      <p>不必具備程式基礎。用簡單的解釋、互動卡片和小測驗，一步步建立你的人工智慧知識地圖。</p>
      <div class="hero-buttons"><a class="btn btn-primary" href="#/path">開始學習 <span aria-hidden="true">↗</span></a><a class="btn btn-quiet" href="#/explore">自由探索 <span aria-hidden="true">→</span></a></div>
      <div class="hero-stats"><div><strong>${articles.length}</strong><span>篇入門文章</span></div><div><strong>${categoryOrder.length}</strong><span>大知識領域</span></div><div><strong>${articles.reduce((n,a)=>n+(a.quiz?.questions.length||0),0)}</strong><span>道互動練習</span></div></div></div>
      <div class="hero-visual" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit-center"><span>✧</span><small>AI</small></div><span class="orbit-bubble bubble-one">LLM</span><span class="orbit-bubble bubble-two">RAG</span><span class="orbit-bubble bubble-three">Agent</span><span class="orbit-bubble bubble-four">Prompt</span><span class="orbit-spark spark-one">✦</span><span class="orbit-spark spark-two">✳</span></div>
    </section>
    <section class="section" aria-labelledby="categories-title"><div class="section-heading"><div><span class="section-kicker">EXPLORE TOPICS</span><h2 id="categories-title">探索 AI 知識領域</h2><p>選一個感興趣的主題，展開你的學習旅程。</p></div><a class="text-link" href="#/explore">瀏覽全部文章 ↗</a></div>
      <div class="category-grid">${categoryOrder.map((key,i)=>`<a href="#/explore/${key}" class="category-card cat-${i+1}"><div class="category-top"><span class="category-icon">${categoryInfo[key].icon}</span><span aria-hidden="true" class="arrow-round">↗</span></div><h3>${categoryInfo[key].name}</h3><p>${categoryInfo[key].description}</p><span class="small-meta">${articles.filter(a=>a.category===key).length} 篇文章</span></a>`).join('')}</div>
    </section>
    <section class="section split-section"><div class="learn-path-banner"><span class="section-kicker">YOUR JOURNEY</span><h2>不知道從哪裡開始？<br>跟著推薦路線學 AI。</h2><p>五個循序漸進的學習階段，從 AI 基本概念到實際應用與安全議題。你也能隨時自由跳轉。</p><a href="#/path" class="btn btn-primary">查看學習路線 →</a><div class="path-decoration" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div></div>
    <div class="resume-panel"><div class="panel-heading"><span class="section-kicker">KEEP EXPLORING</span><h2>你的學習進度</h2></div><div class="progress-ring-wrap"><div class="progress-ring" style="--value:${percent(done,articles.length)}"><span><strong>${percent(done,articles.length)}%</strong><small>已完成</small></span></div><div class="progress-ring-detail"><strong>${done} / ${articles.length} 篇</strong><p>每篇文章都可以由你自己標記完成，沒有強制考試。</p></div></div>
      <div class="resume-next"><span class="small-meta">推薦繼續閱讀</span><a href="#/article/${pending.id}">${htmlEscape(pending.title)} <span aria-hidden="true">↗</span></a></div><a class="text-link" href="#/learning">查看我的學習 →</a></div></section>
    <section class="section" aria-labelledby="featured-title"><div class="section-heading"><div><span class="section-kicker">START HERE</span><h2 id="featured-title">推薦入門文章</h2><p>從最常遇到的 AI 概念開始認識。</p></div></div><div class="articles-grid">${first.map(a=>card(a,progress)).join('')}</div></section>
  </main>`;
}
function visibleArticles() {
  return articles.filter(a => (state.category==='all'||a.category===state.category) && (state.difficulty==='all'||a.difficulty===state.difficulty) && (`${a.title} ${a.summary} ${a.categoryName}`.toLocaleLowerCase('zh-Hant').includes(state.keyword.toLocaleLowerCase('zh-Hant'))));
}
function exploreResults(progress) {
  const filtered = visibleArticles();
  return `<div class="result-meta">找到 <strong>${filtered.length}</strong> 篇知識文章</div><div class="articles-grid">${filtered.map(a=>card(a,progress)).join('') || '<div class="empty-state"><div>⌕</div><h3>找不到符合的文章</h3><p>試著更換關鍵字或其他分類。</p><button class="btn btn-quiet" data-action="clear-search">清除條件</button></div>'}</div>`;
}
function explorePage(progress, routeId) {
  if (routeId && categoryInfo[routeId]) state.category=routeId;
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('KNOWLEDGE LIBRARY','知識探索','從基礎概念到核心技術，找到你想了解的人工智慧知識。')}
      <div class="explore-toolbar"><label class="search-input"><span class="search-icon" aria-hidden="true">⌕</span><input id="explore-search" type="search" placeholder="搜尋 LLM、RAG、Prompt、Agent..." value="${escapeAttr(state.keyword)}" autocomplete="off" aria-label="搜尋知識文章"></label><label class="filter-control">難度 <select id="difficulty-filter" aria-label="選擇文章難度"><option value="all" ${state.difficulty==='all'?'selected':''}>全部難度</option><option value="入門" ${state.difficulty==='入門'?'selected':''}>入門</option><option value="進階" ${state.difficulty==='進階'?'selected':''}>進階</option></select></label></div>
      <div class="filter-pills" role="group" aria-label="文章分類篩選"><button class="filter-pill ${state.category==='all'?'selected':''}" data-action="filter-cat" data-value="all">全部文章</button>${categoryOrder.map(key=>`<button class="filter-pill ${state.category===key?'selected':''}" data-action="filter-cat" data-value="${key}">${htmlEscape(categoryInfo[key].name)}</button>`).join('')}</div>
      <div id="explore-results" aria-live="polite">${exploreResults(progress)}</div></div></main>`;
}
function interactionZone(a) {
  const component = a.interaction;
  if (!component) return '<p>此文章目前沒有互動內容。</p>';
  const session = state.interaction[a.id] || { flipped:false, step:0, side:'a' };
  let widget = '';
  if (component.type==='flashcard') {
    widget=`<button class="flashcard ${session.flipped?'is-flipped':''}" type="button" data-action="flip" data-article="${a.id}" aria-label="${session.flipped?'查看問題':'翻開卡片查看答案'}">
      <span class="flashcard-icon">${session.flipped?'✦':'?'}</span><span class="flashcard-label">${session.flipped?'答案揭曉':'想一想'}</span><strong>${htmlEscape(session.flipped?component.answer:component.question)}</strong>
      ${session.flipped?`<span class="flashcard-explanation">${htmlEscape(component.explanation)}</span>`:''}<span class="flashcard-hint">⟳ 點擊${session.flipped?'返回問題':'翻開卡片'}</span></button>`;
  } else if (component.type==='step-flow') {
    const step = component.steps[Math.min(Math.max(session.step,0),component.steps.length-1)];
    widget=`<div class="flow-widget"><div class="flow-steps">${component.steps.map((s,i)=>`<span class="flow-dot ${i===session.step?'current':i<session.step?'passed':''}" title="${escapeAttr(s.title)}"></span>`).join('')}</div>
      <div class="flow-stage"><span class="flow-number">STEP ${String(session.step+1).padStart(2,'0')} / ${String(component.steps.length).padStart(2,'0')}</span><span class="flow-glyph" aria-hidden="true">${['✦','⌕','◇','✓','✧'][session.step%5]}</span><h3>${htmlEscape(step.title)}</h3><p>${htmlEscape(step.description)}</p></div>
      <div class="flow-actions"><button class="btn btn-quiet btn-small" data-action="prev-step" data-article="${a.id}" ${session.step===0?'disabled':''}>← 上一步</button><button class="btn btn-primary btn-small" data-action="next-step" data-article="${a.id}">${session.step===component.steps.length-1?'重新觀看 ↻':'下一步 →'}</button></div></div>`;
  } else if(component.type==='comparison') {
    const active = session.side==='b'?'option_b':'option_a';
    widget=`<div class="comparison-widget"><div class="comparison-tabs" role="group" aria-label="比較情境"><button class="${active==='option_a'?'active':''}" data-action="compare" data-article="${a.id}" data-value="a">${htmlEscape(component.option_a.label)}</button><button class="${active==='option_b'?'active':''}" data-action="compare" data-article="${a.id}" data-value="b">${htmlEscape(component.option_b.label)}</button></div>
      <div class="comparison-result"><span class="micro-label">SCENARIO ${active==='option_a'?'A':'B'}</span><h3>${htmlEscape(component[active].label)}</h3><p>${htmlEscape(component[active].description)}</p></div><div class="comparison-summary"><strong>重點比較</strong><p>${htmlEscape(component.conclusion)}</p></div></div>`;
  }
  return `<div class="interaction-widget"><div class="widget-title"><span>✳ 互動探索</span><small>${htmlEscape(component.title || '點擊卡片探索')}</small></div>${widget}</div>`;
}
function renderQuiz() {
  const s=state.quizSession;
  if (!s) return '';
  if (s.complete) {
    const correct=s.responses.filter((answer,i)=>answer===s.questions[i].answer).length;
    return `<div class="quiz-finish" aria-live="polite"><div class="finish-symbol">✦</div><span class="section-kicker">CHALLENGE COMPLETED</span><h2>挑戰完成！</h2><div class="big-score">${Math.round(correct/s.questions.length*100)} <span>分</span></div><p>答對 ${correct} / ${s.questions.length} 題。${correct===s.questions.length?'全部答對，繼續探索吧！':'可以參考解析，再回到文章複習。'}</p>
      <div class="finish-review">${s.questions.map((q,i)=>`<div class="review-item"><strong>${s.responses[i]===q.answer?'✓':'↻'} ${htmlEscape(q.question)}</strong><p>正確答案：${htmlEscape(q.options[q.answer])}</p><small>${htmlEscape(q.explanation)}</small></div>`).join('')}</div>
      <div class="quiz-buttons"><button class="btn btn-primary" data-action="restart-quiz">重新挑戰 ↻</button>${s.mode==='article'?'<a class="btn btn-quiet" href="#/learning">查看學習紀錄 →</a>':'<a class="btn btn-quiet" href="#/challenge">返回挑戰列表 →</a>'}</div></div>`;
  }
  const q=s.questions[s.index];
  return `<div class="quiz-widget"><div class="quiz-top"><span class="pill pill-light">${htmlEscape(s.label)}</span><span class="small-meta">第 ${s.index+1} / ${s.questions.length} 題</span></div>${progressBar(s.index,s.questions.length,'quiz-progress')}<h3>${htmlEscape(q.question)}</h3><div class="quiz-options" role="group" aria-label="選擇答案">${q.options.map((o,i)=>{
    let cls = s.selected===i?'selected':'';
    if (s.revealed) cls+= i===q.answer?' correct':i===s.selected?' incorrect':'';
    return `<button type="button" class="quiz-option ${cls}" data-action="select-answer" data-value="${i}" ${s.revealed?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${htmlEscape(o)}</span></button>`;
  }).join('')}</div>
  ${s.revealed?`<div class="quiz-feedback ${s.selected===q.answer?'is-correct':'is-incorrect'}" role="status"><strong>${s.selected===q.answer?'✓ 答對了！':'正確答案：'+String.fromCharCode(65+q.answer)}</strong><p>${htmlEscape(q.explanation)}</p></div>`:''}
  <div class="quiz-buttons">${s.revealed?`<button class="btn btn-primary" data-action="next-question">${s.index===s.questions.length-1?'查看結果 →':'下一題 →'}</button>`:`<button class="btn btn-primary" data-action="submit-answer" ${s.selected===null?'disabled':''}>確認答案 →</button>`}</div></div>`;
}
function articlePage(progress, id) {
  const a=currentArticle(id);
  if (!a) return notFound('找不到這篇文章');
  markOpened(a.id);
  progress=readProgress();
  const related=(a.related||[]).map(id=>articleById[id]).filter(Boolean);
  const stage=stages.find(s=>s.number===a.stage);
  const sequence=stage?.article_ids||[];
  const currentIndex=sequence.indexOf(id);
  const sources=(a.sources||[]).map(id=>sourceById[id]).filter(Boolean);
  return `<main id="main" tabindex="-1"><div class="article-container"><nav class="crumbs" aria-label="麵包屑"><a href="#/home">首頁</a><span>›</span><a href="#/explore/${a.category}">${htmlEscape(a.categoryName)}</a><span>›</span><span>${htmlEscape(a.title)}</span></nav>
    <div class="article-layout"><aside class="article-sidebar"><div class="sidebar-title">KNOWLEDGE MAP</div><h2>知識分類</h2>${categoryOrder.map(key=>`<div class="sidebar-category"><a class="sidebar-category-title ${key===a.category?'selected':''}" href="#/explore/${key}"><span>${categoryInfo[key].icon}</span>${htmlEscape(categoryInfo[key].name)}</a>${key===a.category?`<div class="sidebar-articles">${articles.filter(x=>x.category===key).map(x=>`<a class="${x.id===a.id?'active':''}" href="#/article/${x.id}">${htmlEscape(x.title)}</a>`).join('')}</div>`:''}</div>`).join('')}</aside>
      <article class="article-body"><div class="article-head"><div class="article-tags">${cateBadge(a.category)}<span class="pill pill-muted">${htmlEscape(a.difficulty)}</span><span class="pill pill-muted">約 ${a.minutes} 分鐘</span></div><h1>${htmlEscape(a.title)}</h1><p class="article-lede">${htmlEscape(a.summary)}</p><div class="article-meta"><span>✦ ${htmlEscape(stage?.title||'自由探索')}</span><span>更新日期：${htmlEscape(a.updated_at)}</span></div></div>
      <div class="mobile-toc"><details><summary>本篇目錄</summary>${sectionTitles.map((s,i)=>`<button type="button" data-action="scroll-section" data-value="section-${i}">${s}</button>`).join('')}</details></div>
      ${sectionTitles.map((name,i)=>{
        if(name==='互動探索') return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2>${contentHTML(a.sections[name])}${interactionZone(a)}</section>`;
        if(name==='知識小測驗') return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2>${contentHTML(a.sections[name])}<div id="article-quiz-zone">${state.quizSession?.mode==='article'&&state.quizSession.key===a.id ? renderQuiz() : `<div class="quiz-entry"><div><span class="mini-icon">✎</span><h3>準備好測試一下嗎？</h3><p>3 題單選題，答完可查看解析，不影響文章完成狀態。</p></div><button class="btn btn-primary" data-action="start-article-quiz" data-id="${a.id}">開始測驗 →</button>${progress.scores[`article:${a.id}`]?`<span class="best-note">最佳成績：${scoreText(progress.scores[`article:${a.id}`])}</span>`:''}</div>`}</div></section>`;
        if(name==='延伸閱讀') return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2><div class="related-list">${related.map(r=>`<a href="#/article/${r.id}"><span>${categoryInfo[r.category].icon}</span><div><strong>${htmlEscape(r.title)}</strong><small>${htmlEscape(r.summary)}</small></div><b aria-hidden="true">↗</b></a>`).join('')}</div></section>`;
        if(name==='參考資料') return `<section class="article-section source-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2><p class="muted">本篇為初學者教學摘要；如需引用技術細節，請進一步查閱原始來源。來源連結待個別複核。</p><ol>${sources.map(s=>`<li><a href="${escapeAttr(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${htmlEscape(s.title)}</a><span class="source-org">— ${htmlEscape(s.author)}</span></li>`).join('')}</ol></section>`;
        return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2><div class="prose">${contentHTML(a.sections[name])}</div></section>`;
      }).join('')}
      <div class="completion-box"><div class="completion-info"><span class="completion-icon">${progress.completed[a.id]?'✓':'☆'}</span><div><h3>${progress.completed[a.id]?'你已完成這篇文章！':'完成今天的知識探索'}</h3><p>${progress.completed[a.id]?'需要複習時仍可以隨時回來閱讀。':'閱讀完成後，自己決定是否標記完成；測驗成績獨立記錄。'}</p></div></div><button class="btn ${progress.completed[a.id]?'btn-quiet':'btn-primary'}" data-action="complete-article" data-id="${a.id}" data-value="${progress.completed[a.id]?'no':'yes'}">${progress.completed[a.id]?'取消完成標記':'✓ 標記已完成'}</button></div>
      <div class="article-pager">${currentIndex>0?`<a href="#/article/${sequence[currentIndex-1]}"><small>← 上一篇</small><strong>${htmlEscape(articleById[sequence[currentIndex-1]].title)}</strong></a>`:'<span></span>'}${currentIndex<sequence.length-1?`<a class="next" href="#/article/${sequence[currentIndex+1]}"><small>下一篇 →</small><strong>${htmlEscape(articleById[sequence[currentIndex+1]].title)}</strong></a>`:'<span></span>'}</div></article>
      <aside class="article-toc"><div class="toc-title">ON THIS PAGE</div><nav aria-label="文章目錄">${sectionTitles.map((name,i)=>`<button type="button" data-action="scroll-section" data-value="section-${i}">${htmlEscape(name)}</button>`).join('')}</nav><div class="toc-progress">${statusBadge(a,progress)}<span>階段 ${a.stage} / 5</span></div></aside>
    </div></div></main>`;
}
function pathPage(progress) {
  const done=totalDone(progress);
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('LEARNING ROADMAP','你的 AI 學習路線','五個循序漸進的階段，從基礎到應用；你可以自由選擇任何階段開始。')}
    <div class="overall-path-progress"><div><span class="section-kicker">OVERALL PROGRESS</span><h2>讓每一次探索，都成為成長的一步。</h2><p>已完成 ${done} / ${articles.length} 篇文章</p></div><div class="path-overall-value">${percent(done,articles.length)}%</div></div>${progressBar(done,articles.length)}
    <div class="roadmap">${stages.map((stage,i)=>{
      const as=getStageArticles(stage), completed=completedCount(stage.article_ids,progress);
      return `<section class="roadmap-stage"><div class="stage-rail"><div class="stage-number">${String(stage.number).padStart(2,'0')}</div><span class="rail-line"></span></div><div class="stage-content"><div class="stage-head"><div><span class="section-kicker">STAGE ${String(stage.number).padStart(2,'0')}</span><h2>${htmlEscape(stage.title)}</h2><p>${htmlEscape(stage.description)}</p></div><span class="stage-percent">${percent(completed,as.length)}%</span></div>${progressBar(completed,as.length)}
      <div class="roadmap-articles">${as.map((a,idx)=>`<a href="#/article/${a.id}" class="roadmap-article"><span class="roadmap-item-number">${String(idx+1).padStart(2,'0')}</span><span class="roadmap-item-content"><strong>${htmlEscape(a.title)}</strong><small>${htmlEscape(a.summary)}</small></span>${statusBadge(a,progress)}<span class="roadmap-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></div></section>`;
    }).join('')}</div></div></main>`;
}
function pickQuestions(category) {
  const pool=articles.filter(a=>category==='all'||a.category===category).flatMap(a=>a.quiz?.questions||[]);
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,Math.min(5,pool.length));
}
function challengePage(progress,id) {
  if(id==='run' && state.quizSession?.mode==='challenge') return `<main id="main" tabindex="-1"><div class="page-shell challenge-run"><a class="back-link" href="#/challenge">← 返回知識挑戰</a><div class="challenge-run-head"><span class="section-kicker">KNOWLEDGE CHALLENGE</span><h1>${htmlEscape(state.quizSession.label)}</h1><p>每題都有答案解析，答完即可查看結果。</p></div>${renderQuiz()}</div></main>`;
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('TEST YOUR KNOWLEDGE','AI 知識挑戰','把學到的觀念變成自己的知識！自由選擇主題，進行五題小挑戰。')}
  <div class="challenge-hero-note"><span>✳</span><p>所有題目來自現有文章題庫。答題後立即查看解析，測驗不會限制閱讀與學習路線。</p></div><div class="section-heading"><div><span class="section-kicker">CHOOSE YOUR TOPIC</span><h2>選擇挑戰主題</h2></div></div><div class="challenge-grid">
  ${categoryOrder.map((key,i)=>`<div class="challenge-card"><div class="challenge-icon cat-${i+1}">${categoryInfo[key].icon}</div><span class="small-meta">${htmlEscape(categoryInfo[key].name)}</span><h3>${htmlEscape(categoryInfo[key].name)}挑戰</h3><p>${htmlEscape(categoryInfo[key].description)}</p><div class="challenge-card-bottom"><span class="small-meta">5 題・最佳 ${scoreText(progress.scores[`challenge:${key}`])}</span><button class="btn btn-primary btn-small" data-action="start-challenge" data-value="${key}">開始 →</button></div></div>`).join('')}
  <div class="challenge-card challenge-all"><div class="challenge-icon">✦</div><span class="small-meta">ALL TOPICS</span><h3>綜合知識挑戰</h3><p>從五個知識領域中隨機選題，看看自己掌握了多少概念。</p><div class="challenge-card-bottom"><span class="small-meta">5 題・最佳 ${scoreText(progress.scores['challenge:all'])}</span><button class="btn btn-primary btn-small" data-action="start-challenge" data-value="all">開始 →</button></div></div>
  </div></div></main>`;
}
function learningPage(progress) {
  const done=totalDone(progress);
  const listed=articles.filter(a=>state.learningTab==='all'||(state.learningTab==='done'?progress.completed[a.id]:state.learningTab==='reading'?progress.opened[a.id]&&!progress.completed[a.id]:!progress.opened[a.id]));
  const attempted=Object.keys(progress.scores||{}).length;
  const next=articles.find(a=>progress.opened[a.id]&&!progress.completed[a.id])||articles.find(a=>!progress.completed[a.id]);
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('MY LEARNING','我的學習','記錄每一步探索，依照自己的步調慢慢累積 AI 知識。')}
  <div class="summary-grid"><div class="summary-card"><span class="summary-icon">✦</span><strong>${done}<small> / ${articles.length}</small></strong><span>已完成文章</span></div><div class="summary-card"><span class="summary-icon">✎</span><strong>${attempted}</strong><span>已有成績的測驗</span></div><div class="summary-card"><span class="summary-icon">◈</span><strong>${percent(done,articles.length)}%</strong><span>總學習進度</span></div></div>
  <div class="learning-columns"><section class="learning-box"><div class="section-heading compact"><div><span class="section-kicker">STAGE PROGRESS</span><h2>學習路線進度</h2></div><a class="text-link" href="#/path">查看路線 →</a></div>${stages.map(s=>`<div class="learning-stage"><div><strong>${htmlEscape(s.title)}</strong><span>${completedCount(s.article_ids,progress)} / ${s.article_ids.length}</span></div>${progressBar(completedCount(s.article_ids,progress),s.article_ids.length)}</div>`).join('')}</section>
    <section class="learning-box"><div class="section-heading compact"><div><span class="section-kicker">NEXT STEP</span><h2>推薦繼續閱讀</h2></div></div>${next?`<div class="next-article"><span class="pill pill-light">${htmlEscape(next.categoryName)}</span><div class="next-article-spark">${categoryInfo[next.category].icon}</div><h3>${htmlEscape(next.title)}</h3><p>${htmlEscape(next.summary)}</p><a class="btn btn-primary" href="#/article/${next.id}">繼續學習 ↗</a></div>`:'<div class="next-article"><h3>已完成所有文章！</h3><p>試試知識挑戰，或重新閱讀感興趣的主題。</p><a class="btn btn-primary" href="#/challenge">前往知識挑戰 →</a></div>'}</section></div>
  <section class="section"><div class="section-heading"><div><span class="section-kicker">YOUR LIBRARY</span><h2>我的文章紀錄</h2></div></div><div class="filter-pills" role="group" aria-label="閱讀狀態篩選">${[['all','全部'],['reading','閱讀中'],['done','已完成'],['notstarted','尚未開始']].map(([key,label])=>`<button class="filter-pill ${state.learningTab===key?'selected':''}" data-action="learning-tab" data-value="${key}">${label}</button>`).join('')}</div>
  <div class="learning-article-list">${listed.map(a=>`<a href="#/article/${a.id}" class="learning-article"><div class="learning-list-icon">${categoryInfo[a.category].icon}</div><div><strong>${htmlEscape(a.title)}</strong><small>${htmlEscape(a.categoryName)} · ${htmlEscape(a.minutes)} 分鐘</small></div>${statusBadge(a,progress)}<span aria-hidden="true">↗</span></a>`).join('')||'<div class="empty-state"><h3>目前沒有符合狀態的文章</h3><p>可以切換其他狀態查看。</p></div>'}</div></section>
  <section class="section"><div class="section-heading"><div><span class="section-kicker">QUIZ RECORDS</span><h2>測驗最佳成績</h2><p>閱讀完成和測驗成績分開記錄，不需要通過考試才能學習。</p></div></div><div class="score-grid">${articles.filter(a=>progress.scores[`article:${a.id}`]).map(a=>`<a href="#/article/${a.id}" class="score-record"><span>${htmlEscape(a.title)}</span><strong>${scoreText(progress.scores[`article:${a.id}`])} <span aria-hidden="true">↗</span></strong></a>`).join('')||'<div class="empty-state"><h3>還沒有文章測驗紀錄</h3><p>在任一篇文章底部可以開始作答。</p></div>'}${categoryOrder.concat('all').filter(key=>progress.scores[`challenge:${key}`]).map(key=>`<a href="#/challenge" class="score-record"><span>${key==='all'?'綜合知識挑戰':categoryInfo[key].name+'挑戰'}</span><strong>${scoreText(progress.scores[`challenge:${key}`])} <span aria-hidden="true">↗</span></strong></a>`).join('')}</div></section><p class="storage-note">ⓘ 學習紀錄儲存在目前的瀏覽器中；更換裝置或清除網站資料後可能無法保留。</p></div></main>`;
}
function aboutPage() {
  return `<main id="main" tabindex="-1"><div class="page-shell about-page">${pageHero('ABOUT THE PROJECT','關於 AI Explorer','把難懂的 AI 技術，整理成每個人都能開始閱讀、操作與探索的知識。')}
  <section class="about-feature"><div><span class="section-kicker">OUR IDEA</span><h2>不只是文章集合，<br>而是持續成長的知識庫。</h2><p>AI Knowledge Explorer 結合互動學習網站與 LLM Wiki 的持續知識整理思路。以可追溯的來源與 Markdown 文章為基礎，將知識轉化成翻轉卡、流程圖、比較卡與測驗。</p></div><div class="about-graphic"><span>RAW</span><i>↓</i><span>WIKI</span><i>↓</i><span>LEARN</span></div></section>
  <div class="about-principles"><div><span>01</span><h3>好理解</h3><p>以繁體中文、簡單例子與互動方式介紹 AI。</p></div><div><span>02</span><h3>可追溯</h3><p>知識內容保留來源連結，重要事實仍需查證。</p></div><div><span>03</span><h3>可擴充</h3><p>新增內容遵守 AGENTS.md，沿用既有文章與互動模板。</p></div></div>
  <section class="about-guideline"><span class="section-kicker">HOW WE KEEP IT CONSISTENT</span><h2>一份 AGENTS.md，持續維護同一套規則。</h2><p>我們用四種工作流程管理知識：<strong>Ingest</strong> 納入來源、<strong>Query</strong> 查詢與綜整、<strong>Publish</strong> 發布互動教學、<strong>Lint</strong> 檢查品質。這些規範讓新文章在分類、來源、互動卡片與測驗上維持一致。</p><div class="workflow-chips"><span>Ingest</span><span>Query</span><span>Publish</span><span>Lint</span></div></section>
  <div class="about-disclaimer"><strong>關於資料來源</strong><p>網站內容為入門教學摘要，不等於官方技術文件。所列參考來源需在正式對外發布前逐一複核；若有錯誤，應依據可查證的來源修正。</p></div></div></main>`;
}
function notFound(message='找不到這個頁面') {
  return `<main id="main" tabindex="-1"><div class="not-found"><div>✧</div><h1>${htmlEscape(message)}</h1><p>你可以回首頁，或從知識探索重新開始。</p><a class="btn btn-primary" href="#/home">返回首頁 →</a></div></main>`;
}
function render(preserveScroll=false) {
  const y=window.scrollY;
  const progress=readProgress();
  const current=route();
  let page;
  switch(current.page) {
    case 'home': page=homePage(progress); break;
    case 'explore': page=explorePage(progress,current.id); break;
    case 'article': page=articlePage(progress,current.id); break;
    case 'path': page=pathPage(progress); break;
    case 'challenge': page=challengePage(progress,current.id); break;
    case 'learning': page=learningPage(progress); break;
    case 'about': page=aboutPage(); break;
    default: page=notFound();
  }
  app.innerHTML=header(current.page)+page+footer();
  document.title=(current.page==='article'&&currentArticle(current.id)?currentArticle(current.id).title+' | ':'')+'AI Explorer | AI 知識探索百科';
  if (preserveScroll) window.scrollTo(0,y);
  else window.scrollTo(0,0);
}
function startQuiz(mode,key) {
  let questions, label;
  if(mode==='article') {
    const a=articleById[key]; if(!a?.quiz) return;
    questions=a.quiz.questions; label='文章小測驗';
  } else {
    questions=pickQuestions(key); label=key==='all'?'綜合知識挑戰':`${categoryInfo[key]?.name||'AI'}挑戰`;
  }
  if (!questions.length) return;
  state.quizSession={mode,key,label,questions,index:0,responses:[],selected:null,revealed:false,complete:false};
}
function proceedQuestion() {
  const s=state.quizSession;
  if(!s||!s.revealed) return;
  if(s.index===s.questions.length-1) {
    s.complete=true;
    const correct=s.responses.filter((x,i)=>x===s.questions[i].answer).length;
    saveScore(`${s.mode}:${s.key}`,correct,s.questions.length);
  } else {s.index++;s.selected=null;s.revealed=false;}
  render(true);
}
function selectedInteractive(articleId) {
  return state.interaction[articleId] ||= {flipped:false,step:0,side:'a'};
}
document.addEventListener('click', event => {
  if(event.target.closest('.skip-link')) { event.preventDefault(); document.getElementById('main')?.focus(); return; }
  const button=event.target.closest('[data-action]');
  if(!button) return;
  const action=button.dataset.action;
  const id=button.dataset.id||button.dataset.article;
  const value=button.dataset.value;
  if (action==='toggle-menu') {state.menuOpen=!state.menuOpen; render(true); return;}
  if (action==='filter-cat') {state.category=value;render(true);return;}
  if (action==='clear-search') {state.keyword='';state.category='all';state.difficulty='all';render(true);return;}
  if (action==='learning-tab') {state.learningTab=value;render(true);return;}
  if (action==='scroll-section') {document.getElementById(value)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  if (action==='complete-article') {setCompleted(id,value==='yes');render(true);return;}
  if (action==='flip') {const session=selectedInteractive(id);session.flipped=!session.flipped;render(true);return;}
  if (action==='prev-step'||action==='next-step') {const a=articleById[id];const s=selectedInteractive(id);const count=a.interaction.steps.length;s.step=action==='prev-step'?Math.max(0,s.step-1):(s.step+1)%count;render(true);return;}
  if (action==='compare') {selectedInteractive(id).side=value;render(true);return;}
  if (action==='start-article-quiz') {startQuiz('article',id);render(true);return;}
  if (action==='start-challenge') {startQuiz('challenge',value);location.hash='#/challenge/run';return;}
  if (action==='select-answer') {if(state.quizSession && !state.quizSession.revealed){state.quizSession.selected=Number(value);render(true);}return;}
  if (action==='submit-answer') {if(state.quizSession?.selected!==null){state.quizSession.revealed=true;state.quizSession.responses[state.quizSession.index]=state.quizSession.selected;render(true);}return;}
  if (action==='next-question') {proceedQuestion();return;}
  if (action==='restart-quiz') {const s=state.quizSession;startQuiz(s.mode,s.key);render(true);return;}
});
document.addEventListener('input',event => {
  if(event.target.id==='explore-search') {
    state.keyword=event.target.value;
    const target=document.getElementById('explore-results');
    if(target) target.innerHTML=exploreResults(readProgress());
  }
});
document.addEventListener('change',event => {
  if(event.target.id==='difficulty-filter') {state.difficulty=event.target.value;render(true);}
});
window.addEventListener('hashchange',()=> {state.menuOpen=false;render();});
render();
