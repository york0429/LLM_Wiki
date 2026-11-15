from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
source_data = [
 ('src-0001','IBM','What is artificial intelligence?','https://www.ibm.com/think/topics/artificial-intelligence','概念與人工智慧基本定義'),
 ('src-0002','Google for Developers','Machine Learning Crash Course','https://developers.google.com/machine-learning/crash-course','機器學習、深度學習、神經網路及大型語言模型'),
 ('src-0003','Google AI for Developers','提示設計策略','https://ai.google.dev/gemini-api/docs/prompting-strategies?hl=zh-tw','Prompt Engineering 的基本做法'),
 ('src-0004','Lewis et al., NeurIPS 2020','Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks','https://proceedings.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html','RAG 原始研究與方法'),
 ('src-0005','Anthropic Engineering','Building effective agents','https://www.anthropic.com/engineering/building-effective-agents','AI Agent 與工作流程的差別'),
 ('src-0006','IBM','What is a chatbot?','https://www.ibm.com/think/topics/chatbots','聊天機器人類型與應用'),
 ('src-0007','NIST','AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework','AI 風險與治理'),
 ('src-0008','NIST','Generative AI Profile (AI 600-1)','https://nvlpubs.nist.gov/nistpubs/AI/NIST.AI.600-1.pdf','幻覺與個資隱私風險')
]
sources=[dict(source_id=sid,author=author,title=title,url=url,description=desc,type='official_or_research',published_at=None,collected_at='2026-11-15',status='verified',related_articles=[]) for sid,author,title,url,desc in source_data]

# 文案由本專案原創撰寫；來源僅用來支持概念與延伸查證。
A=[
 dict(id='ai-introduction',title='什麼是人工智慧？',category='basics',difficulty='入門',stage=1,minutes=5,summary='從生活中的推薦系統、語音辨識開始，理解 AI 的基本概念。',icon='✦',sources=['src-0001'],related=['machine-learning','generative-ai'],kind='flashcard',
 sections=[
 '人工智慧（Artificial Intelligence，AI）是讓電腦系統完成某些原本需要人類智慧才能處理的任務的技術領域，例如辨識影像、理解文字、預測或協助決策。**AI 並不等於有自我意識的機器**；多數現實中的 AI 都是針對特定任務建立的系統。',
 'AI 的做法很多。有些系統使用明確的規則，有些則透過大量資料中的模式來學習。先定義問題、準備適當資料、建立模型或規則，再用測試資料檢查結果，是理解 AI 專案的實用方式。',
 '影片平台會根據觀看紀錄推薦內容；手機可以辨識語音；郵件服務能協助過濾垃圾信。這些功能都可能使用不同形式的 AI。',
 ['AI 是一個廣泛領域，不只有聊天機器人。','機器學習是實現 AI 的其中一種方式。','AI 的輸出可能出錯，需要評估及適當的人類監督。']],
 interaction=dict(type='flashcard',question='AI 一定要像人類一樣思考嗎？',answer='不需要。AI 可以在特定任務上表現出智能行為，並不代表具有與人相同的思考方式。',explanation='辨識影像與預測文字都屬於 AI 應用，但運作機制可能非常不同。'),
 questions=[('以下哪一項最貼近人工智慧的定義？',['只能儲存檔案的電腦','讓電腦執行某些需要智慧的任務','每台電腦都有的作業系統','一定具有自我意識的機器'],1,'AI 是技術領域，不要求系統擁有自我意識。'),('哪個例子可能用到 AI？',['推薦影片','更換滑鼠電池','關閉電源','插上網路線'],0,'推薦系統可能學習使用者偏好來排序內容。'),('關於 AI，哪個說法較恰當？',['任何輸出都正確','只能製作圖片','可能需要測試及人類監督','AI 就是機器人外殼'],2,'模型有錯誤風險，應以測試與監督確認使用效果。')]),
 dict(id='machine-learning',title='機器學習與深度學習',category='basics',difficulty='入門',stage=1,minutes=6,summary='理解機器學習、深度學習與人工智慧的包含關係。',icon='◈',sources=['src-0001','src-0002'],related=['ai-introduction','llm-introduction'],kind='comparison',
 sections=['機器學習（Machine Learning）讓系統從資料中學習模式，再用這些模式處理新資料。深度學習（Deep Learning）是機器學習的一個分支，常使用多層神經網路。','可以把它想成三層關係：**人工智慧包含機器學習，機器學習包含深度學習**。例如一般的分類模型可能從幾個特徵學習規則，而深度神經網路能從大量資料中學習更複雜的表徵。兩者都需要適當資料、評估及檢查偏差。','用歷年房價資料預測價格，可能採用機器學習；辨識照片中的不同物件，則常採用深度學習模型，但不是每個問題都需要最複雜的模型。',['AI、機器學習、深度學習是包含關係。','深度學習通常透過多層神經網路學習。','資料品質與評估方式比模型名稱更重要。']],
 interaction=dict(type='comparison',title='兩種學習方法比較',option_a=dict(label='機器學習',description='範圍較廣，包含決策樹、線性模型與神經網路等多種方法。'),option_b=dict(label='深度學習',description='機器學習的分支，通常使用多層神經網路學習複雜模式。'),conclusion='深度學習不是 AI 的全部，也不代表一定比其他方法適合每個任務。'),
 questions=[('深度學習和機器學習的關係為何？',['完全無關','深度學習包含所有 AI','深度學習是機器學習的一部分','兩者都是作業系統'],2,'深度學習是機器學習的分支。'),('哪一種技術常以多層神經網路為核心？',['深度學習','電子郵件協定','資料備份','檔案壓縮'],0,'深度學習常使用具有多層結構的神經網路。'),('選擇機器學習方法時，重要的是？',['只選名字最新的','考量資料與任務需求','永遠使用最大模型','不需要測試'],1,'模型應符合任務、資料與評估需求。')]),
 dict(id='generative-ai',title='什麼是生成式 AI？',category='generative-ai',difficulty='入門',stage=2,minutes=5,summary='認識 AI 如何根據指令產生文字、圖片等新內容。',icon='✧',sources=['src-0001','src-0002'],related=['ai-introduction','llm-introduction'],kind='flashcard',
 sections=['生成式 AI（Generative AI）是能依據輸入與學習到的資料模式，產生文字、圖片、音訊或其他內容的一類 AI 技術。它與只做分類或預測的系統相比，更強調「產生內容」。','生成式模型在訓練時學習資料中的統計模式；使用者提供指令後，模型再根據上下文生成回應。不同模型支援的輸入與輸出形式各不相同。**生成得流暢不代表內容真實**，仍需查核重要事實。','你可以請生成式 AI 把一段艱澀的文章改寫成適合初學者的說明，或產生一封邀請信的草稿，再自行檢查與修改。',['生成式 AI 的核心是產生內容。','輸入指令會影響輸出形式與細節。','文字通順不等於正確，重要資訊要查核。']],
 interaction=dict(type='flashcard',question='生成式 AI 和一般分類模型最大的不同是什麼？',answer='生成式 AI 能產生新的內容，例如文字或圖片。',explanation='分類模型通常從既有選項做判斷；生成式模型則生成符合條件的輸出。'),
 questions=[('哪一項是生成式 AI 常見用途？',['產生文章草稿','更換電腦電池','增加螢幕亮度','清理鍵盤'],0,'生成式 AI 可根據提示生成文字。'),('生成式 AI 產出的文字一定正確嗎？',['一定','不一定，需要核對重要事實','只有英文才正確','無法產生文字'],1,'生成過程可能出現虛構或錯誤資訊。'),('提示詞的角色是？',['取代硬碟','降低螢幕解析度','提供模型任務與上下文','永遠保證答案正確'],2,'提示詞會提供任務、條件與背景。')]),
 dict(id='llm-introduction',title='什麼是大型語言模型（LLM）？',category='generative-ai',difficulty='入門',stage=2,minutes=6,summary='從 Token 與下一段文字的預測，認識大型語言模型。',icon='▣',sources=['src-0002'],related=['generative-ai','prompt-engineering','rag-introduction'],kind='step-flow',
 sections=['大型語言模型（Large Language Model，LLM）是經過大量文字資料訓練，能依照上下文處理與產生文字的模型。它可以協助摘要、回答問題、翻譯與程式撰寫，但仍可能犯錯。','文字會先經過切分，形成稱為 Token 的處理單位。模型接收 Token 序列，利用訓練過程學到的模式預測接下來可能出現的 Token，逐步產生輸出。許多現代 LLM 採用 Transformer 架構，但不同模型的訓練方式與功能可能不同。','使用者輸入「請用三句話解釋機器學習」，模型會根據指令和上下文生成一段回答。若問題涉及最新校規，沒有外部資料的模型可能無法可靠回答。',['LLM 是處理語言的模型，不等於知識資料庫。','Token 是模型處理文字的單位。','模型可能產生錯誤答案，必要時需查證。']],
 interaction=dict(type='step-flow',title='LLM 如何產生文字？',steps=[dict(title='收到提示',description='使用者提供問題、任務或上下文。'),dict(title='轉成 Token',description='文字被切分成模型可處理的單位。'),dict(title='預測接續 Token',description='模型依上下文估計下一個 Token 的可能性。'),dict(title='逐步形成回覆',description='反覆產生後續 Token，直到形成結果。')]),
 questions=[('LLM 的主要用途為何？',['處理與產生語言內容','替換實體硬碟','加速風扇運轉','只顯示圖片'],0,'LLM 在語言理解與生成相關任務上有廣泛應用。'),('Token 是什麼？',['唯一的 AI 品牌','文字處理的單位','電腦螢幕尺寸','網路密碼'],1,'文字會轉換成 Token 供模型處理。'),('對 LLM 回答的適當態度是？',['總是相信','不看來源就引用','重要資訊進一步查核','完全不能使用'],2,'LLM 可能出錯，重要事實需要查證。')]),
 dict(id='prompt-engineering',title='Prompt Engineering 入門',category='techniques',difficulty='入門',stage=3,minutes=5,summary='學會提供清楚目標、背景與格式，改善 AI 的回應。',icon='✎',sources=['src-0003'],related=['llm-introduction','rag-introduction'],kind='comparison',
 sections=['Prompt Engineering（提示工程）是設計和改善輸入指令的方法，目的在於讓模型更清楚理解任務、背景、限制與希望的輸出格式。它不是魔法指令，也不能保證每次回答都正確。','設計提示時，可以依序提供：**目標、背景、限制、輸出格式**。如果結果不理想，檢查是指令不清楚、資料不足還是需要範例，再逐步調整。對高風險資訊仍需查核。','模糊提示：「介紹 AI」。明確提示：「以繁體中文，用三個生活例子向國中生介紹 AI，最後整理三個重點」。後者對內容與格式的要求更清楚。',['明確說明任務與對象。','提供必要背景和限制。','指定輸出格式，並檢查生成結果。']],
 interaction=dict(type='comparison',title='兩種 Prompt 寫法',option_a=dict(label='模糊指令',description='「介紹人工智慧。」缺少對象、長度和預期格式。'),option_b=dict(label='清楚指令',description='「用繁體中文、兩個生活例子，寫約 150 字介紹 AI，最後列出三個重點。」'),conclusion='清楚的指令有助模型掌握需求，但仍需要評估內容正確性。'),
 questions=[('哪個提示較清楚？',['介紹一下','隨便寫','用繁體中文列出三個 AI 應用並各舉一例','你知道嗎'],2,'具體的語言、數量、內容與格式更容易執行。'),('提示工程主要是在做什麼？',['設計與調整輸入指令','更換電腦零件','發明新鍵盤','保證答案永不出錯'],0,'提示工程改善與模型溝通的方式。'),('模型回答不理想時，合理做法是？',['永遠不再使用','補充背景、範例或限制再調整','把字全部刪掉','直接視為事實'],1,'調整提示可改善方向，但仍應查核答案。')]),
 dict(id='rag-introduction',title='什麼是 RAG？',category='techniques',difficulty='入門',stage=3,minutes=6,summary='理解檢索增強生成如何讓 AI 參考外部文件回答問題。',icon='⌕',sources=['src-0004'],related=['llm-introduction','prompt-engineering'],kind='step-flow',
 sections=['RAG（Retrieval-Augmented Generation，檢索增強生成）是一種將「查詢外部資訊」與「語言模型生成」結合的方式。當使用者提出問題時，系統會先搜尋相關資料，再把資料提供給模型參考。','常見流程為：接收問題、檢索文件、挑選相關片段、將片段和問題交給語言模型、生成回答。RAG 能讓回答利用外部內容，但**檢索到錯誤資料或模型理解失誤，仍可能產生錯誤回答**。','校務問答系統可以先查詢選課規則，再依據找到的校方文件回答學生問題；使用者仍應檢查來源和適用學期。',['RAG 結合檢索與生成。','外部資料品質會影響答案品質。','RAG 有助查證，但不保證完全正確。']],
 interaction=dict(type='step-flow',title='RAG 的四個步驟',steps=[dict(title='提出問題',description='使用者詢問「學校的選課規定是什麼？」'),dict(title='檢索資料',description='系統從文件集中搜尋與選課相關的內容。'),dict(title='提供參考',description='將相關段落與使用者問題一起提供給模型。'),dict(title='產生回答',description='模型根據參考內容回答，並可附來源供查證。')]),
 questions=[('RAG 最主要結合哪兩件事？',['畫圖與錄影','資料檢索與語言生成','列印與掃描','音量與亮度'],1,'RAG 在生成回答前檢索相關外部資料。'),('RAG 一定能保證回答正確嗎？',['不能，來源或生成仍可能出錯','一定能','只要有網路就一定能','不需要文件'],0,'RAG 仍取決於檢索與生成品質。'),('哪個情境適合 RAG？',['調整螢幕亮度','更換鍵盤','依據校方文件回答選課問題','替手機充電'],2,'RAG 擅長需要參照外部文件的知識問答。')]),
 dict(id='ai-agent',title='什麼是 AI Agent？',category='applications',difficulty='入門',stage=4,minutes=6,summary='了解 AI Agent 如何根據目標規劃步驟並使用工具。',icon='◇',sources=['src-0005'],related=['ai-chatbot','llm-introduction'],kind='step-flow',
 sections=['AI Agent（AI 代理）通常指能為了完成目標，根據環境資訊選擇步驟、使用工具並檢查結果的 AI 系統。不同產品對 Agent 的定義不完全相同，需要看具體功能。','一般工作流程可能是：接收目標、規劃行動、呼叫工具、檢查回傳結果，再決定下一步。和單純照預先固定路徑執行的工作流程相比，Agent 在部分步驟具有較多動態決策能力。','你可以讓一個具備授權工具的 Agent 整理多份公開文件、歸納重點並產生摘要。工具權限與結果驗證十分重要。',['Agent 著重目標、行動與回饋。','不一定所有多步驟自動化都要稱為 Agent。','需要清楚權限、限制與檢查機制。']],
 interaction=dict(type='step-flow',title='AI Agent 的循環',steps=[dict(title='接收目標',description='例如「整理指定主題的公開資料」。'),dict(title='規劃步驟',description='依目標決定要找哪些資訊與使用哪些工具。'),dict(title='執行工具',description='在允許的權限內搜尋資料或處理文件。'),dict(title='檢查結果',description='檢查工具輸出是否符合目標與限制。'),dict(title='完成或調整',description='達到條件就完成，否則調整後繼續。')]),
 questions=[('AI Agent 常見的特色為何？',['只能播放音樂','可依目標使用工具並檢查結果','只能顯示圖片','不會犯錯'],1,'AI Agent 通常結合目標、工具使用與回饋。'),('Agent 使用外部工具時重要的是？',['不設定權限','完全不檢查','權限控管與結果驗證','永遠允許所有操作'],2,'授權與檢查可降低不當操作的風險。'),('AI Agent 與固定工作流程的常見差異？',['可能動態決定部分步驟','Agent 一定不需要模型','固定流程一定更危險','兩者完全一樣'],0,'Agent 通常更常依情況動態決策。')]),
 dict(id='ai-chatbot',title='AI 聊天機器人的應用',category='applications',difficulty='入門',stage=4,minutes=5,summary='比較規則式與生成式聊天機器人，了解常見使用情境。',icon='☷',sources=['src-0006'],related=['ai-agent','generative-ai'],kind='comparison',
 sections=['聊天機器人（Chatbot）是一種讓使用者透過文字或語音與軟體互動的應用。並非所有聊天機器人都使用大型語言模型：有些按照固定規則運作，有些則結合 NLP 或生成式 AI。','規則式聊天機器人適合選項清楚、流程穩定的任務；生成式聊天機器人更擅長自然語言對話及彈性回答，但也更需要內容檢查與資料保護。','網站客服可以先提供固定的退貨流程選項；進一步的 AI 聊天機器人可依使用者敘述整理需求，再把問題轉交給對應窗口。',['聊天機器人不一定使用生成式 AI。','規則式與生成式各有適合的情境。','對話內容可能涉及個資，應重視資料保護。']],
 interaction=dict(type='comparison',title='兩種聊天機器人比較',option_a=dict(label='規則式',description='依預設選單或關鍵字回覆，對固定流程較可預期。'),option_b=dict(label='生成式 AI',description='可根據自然語言生成較有彈性的回答，但可能出現錯誤。'),conclusion='選擇方式應取決於任務的彈性、風險與可控性。'),
 questions=[('所有聊天機器人都使用 LLM 嗎？',['是','不是，有些是規則式','只有電話裡的才有','只有英文聊天機器人才有'],1,'聊天機器人可以用規則或不同 AI 技術實作。'),('規則式聊天機器人較適合？',['固定選單與流程','無限制開放式推理','自動保證所有事實','不需要任何設計'],0,'可預期的固定流程適合規則式實作。'),('使用聊天機器人時需要注意？',['只要能聊天就安全','一定會記住所有內容','個資與回答正確性','不必檢查資訊'],2,'重要資訊與個人資料都應謹慎處理。')]),
 dict(id='ai-hallucination',title='什麼是 AI 幻覺？',category='safety',difficulty='入門',stage=5,minutes=5,summary='理解 AI 為何可能給出流暢但錯誤的資訊。',icon='⚑',sources=['src-0008','src-0007'],related=['ai-privacy','llm-introduction'],kind='comparison',
 sections=['AI 幻覺（Hallucination）是指生成式 AI 產生看似合理、但內容不正確或缺乏事實依據的回應。例如模型可能編造不存在的書名、資料來源或日期。','語言模型的文字生成不等同於逐項查證資料庫，因此可能在資料不足、提問含糊或生成過程中犯錯。改善方式包括提供可信來源、使用檢索輔助、要求來源連結，並由人核查重要結論。','如果問 AI「某篇論文的 DOI 是什麼」，得到一個格式很像 DOI 的字串，仍應到實際論文網站確認，而不是直接引用。',['流暢的回答也可能是錯誤資訊。','確認引用與來源是否真的存在。','RAG 可以協助降低某些問題，但不是完全保證。']],
 interaction=dict(type='comparison',title='如何看待 AI 回答？',option_a=dict(label='直接相信',description='看到有條理的答案就直接轉貼，可能把編造的事實當真。'),option_b=dict(label='交叉查證',description='確認原始來源、日期、適用範圍，再使用重要資訊。'),conclusion='對學術、醫療、法律等重要資訊，更需要額外查核。'),
 questions=[('AI 幻覺指的是什麼？',['產生錯誤或缺乏依據的內容','螢幕閃爍','顯示器亮度過高','使用者做夢'],0,'幻覺指模型生成不正確或無根據的內容。'),('模型列出論文網址後應該？',['直接相信','確認網址與論文是否真實存在','只看標題長度','忽略作者'],1,'形式看似專業不代表來源真的存在。'),('哪個行為有助降低誤用錯誤資訊？',['只看一份 AI 答案','完全不看來源','核對可信來源','要求回答一定正確'],2,'交叉查證是重要的使用習慣。')]),
 dict(id='ai-privacy',title='AI 與資料隱私',category='safety',difficulty='入門',stage=5,minutes=5,summary='認識使用 AI 工具時的個資風險與安全習慣。',icon='◍',sources=['src-0007','src-0008'],related=['ai-hallucination','ai-chatbot'],kind='flashcard',
 sections=['AI 工具可能接觸使用者輸入的文字、文件或其他資料。當資料包含姓名、聯絡方式、帳號或其他敏感資訊時，使用者應理解工具如何處理與保存資料，避免不必要的揭露。','可採取的基本原則包括：輸入前檢查是否含個資、只提供完成任務必要的資料、確認服務的隱私設定與資料保留政策，以及避免將機密檔案上傳到不適合的平台。不同 AI 服務的資料處理方式並不相同。','如果只是想請 AI 修改一封公告，可以先移除真實姓名、電話與學號，再使用示範資料完成文字潤飾。',['只提供完成任務需要的最少資料。','確認服務條款、隱私政策與保存方式。','公開分享 AI 生成內容前也要檢查是否包含個資。']],
 interaction=dict(type='flashcard',question='將真實學號和電話貼給 AI 前，最適合先做什麼？',answer='先確認是否真的需要這些資料；通常可以刪除或改成範例資料。',explanation='資料最小化可以減少不必要的個人資訊暴露。'),
 questions=[('將個人資料交給 AI 前，較好的做法是？',['全部照貼','確認必要性並刪除無關個資','完全不看平台政策','分享所有密碼'],1,'只使用必要資料有助降低風險。'),('哪項屬於可能敏感的內容？',['公開的天氣預報','一般的數學公式','未公開的帳號密碼','常見英文單字'],2,'帳號密碼等資訊不應隨意輸入外部工具。'),('不同 AI 工具的資料保存方式？',['一定完全一樣','一定不保存','需要依各服務政策確認','一定可以公開分享'],2,'隱私政策與資料處理方式因服務而異。')])
]

# Also ensure no trailing invalid entity in article metadata.
category_names={'basics':'AI 基礎知識','generative-ai':'生成式 AI','techniques':'AI 核心技術','applications':'AI 工具與應用','safety':'AI 安全與未來'}
for a in A:
    md=(f'---\nid: {a["id"]}\ntitle: {json.dumps(a["title"],ensure_ascii=False)}\ncategory: {a["category"]}\ndifficulty: {json.dumps(a["difficulty"],ensure_ascii=False)}\nstage: {a["stage"]}\nsummary: {json.dumps(a["summary"],ensure_ascii=False)}\nminutes: {a["minutes"]}\ninteraction_id: {a["id"]}\nquiz_id: {a["id"]}\nrelated: {json.dumps(a["related"],ensure_ascii=False)}\nsources: {json.dumps(a["sources"],ensure_ascii=False)}\nupdated_at: 2026-11-15\n---\n\n')
    blocks=['概念介紹','運作原理','生活應用範例','互動探索','知識重點整理','知識小測驗','延伸閱讀','參考資料']
    for i,b in enumerate(blocks):
        md += f'## {b}\n\n'
        if i in (0,1,2): md+= a['sections'][i]+'\n\n'
        if i==3: md+='透過下方互動卡片，從另一個角度理解本節概念。\n\n'
        if i==4: md+='\n'.join('- '+x for x in a['sections'][3])+'\n\n'
        if i==5: md+='完成閱讀後，透過三題選擇題檢查自己的理解。\n\n'
        if i==6: md+='推薦閱讀下方的相關文章，串連不同 AI 概念。\n\n'
        if i==7: md+='本篇依據所列來源整理為教學摘要，請以原始文件為準。\n\n'
    (root/'wiki'/a['category']/(a['id']+'.md')).write_text(md,encoding='utf-8')
    inter=dict(id=a['id'],article_id=a['id'],**a['interaction'])
    (root/'interactions'/(a['id']+'.json')).write_text(json.dumps(inter,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    quiz=dict(id=a['id'],article_id=a['id'],version=1,questions=[dict(question_id=f'{a["id"]}-q{i+1}',article_id=a['id'],version=1,question=q,options=opts,answer=ans,explanation=exp) for i,(q,opts,ans,exp) in enumerate(a['questions'])])
    (root/'quizzes'/(a['id']+'.json')).write_text(json.dumps(quiz,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    for sid in a['sources']:
        next(s for s in sources if s['source_id']==sid)['related_articles'].append(a['id'])
(root/'sources'/'sources.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
stages=[]
for n,cat,title,sub in [(1,'basics','認識人工智慧','從 AI 的基本概念開始'),(2,'generative-ai','生成式 AI 的世界','認識生成內容與大型語言模型'),(3,'techniques','AI 核心技術','學習 Prompt 與 RAG 的方法'),(4,'applications','AI 工具與應用','了解 Agent 與聊天機器人'),(5,'safety','AI 安全與未來','建立負責任的 AI 使用習慣')]:
    stages.append(dict(id=f'stage-{n}',number=n,title=title,description=sub,article_ids=[a['id'] for a in A if a['stage']==n]))
(root/'learning-paths'/'main.json').write_text(json.dumps(dict(id='ai-beginner',title='AI 初學者學習路線',stages=stages),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
index='# AI 知識索引\n\n> 依分類整理所有已公開的入門文章，更新時間：2026-11-15。\n\n'
for cat,name in category_names.items():
    index+=f'## {name}\n\n'
    for a in A:
        if a['category']==cat:
            path=f'{cat}/{a["id"]}.md'
            index+=f'- [{a["title"]}]({path}) — {a["summary"]}\n'
    index+='\n'
(root/'wiki'/'index.md').write_text(index,encoding='utf-8')
(root/'wiki'/'log.md').write_text('# 維護紀錄\n\n## [2026-11-15] publish | 初始知識庫\n\n- 建立 5 個分類、10 篇入門文章與各篇測驗、互動資料。\n- 建立來源紀錄、文章索引與 5 階段學習路線。\n- 初版文章為繁體中文教學改寫，重要技術依據已連結來源；後續可持續補強。\n',encoding='utf-8')
print('generated',len(A),'articles',sum(len(a['questions']) for a in A),'quiz questions',len(sources),'sources')
