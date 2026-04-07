# Figma Make プロンプト集 v2
# China Travel Guide App — 完全版（修正＋追加）

> 更新日：2026-04-06  
> 対象スクリーン数：23画面
> 前回からの変更：タブ配置修正4画面＋新規追加15画面

---

## ━━ 共通デザインシステム（最初に必ず適用）━━

```
Design system for "China Travel Guide" mobile app (390×844px, iPhone 14 Pro):

Colors:
- Primary: #E8342A (China red)
- Navy: #1A1A2E
- Gold accent: #F5A623
- Success green: #27AE60
- Warning amber: #F39C12
- Background: #F8F6F3 (warm off-white)
- Card: #FFFFFF
- Text primary: #1A1A2E
- Text secondary: #6B7280

Typography: Inter
- H1: 26px bold / H2: 20px semibold / Body: 15px / Caption: 12px

Components:
- Card: 16px radius, shadow 0 2px 12px rgba(0,0,0,0.08)
- Button primary: full width 52px height 12px radius #E8342A white text
- Chip: 8px radius 6px 12px padding
- Progress bar: 4px height red fill

Bottom tab bar (5 tabs, always shown in main app screens):
  Tab 1: 準備 (shield icon)
  Tab 2: 探す (compass icon)
  Tab 3: 旅程 (suitcase icon)
  Tab 4: レート (dollar sign icon)
  Tab 5: ツール (wrench icon)
Active tab: red icon + red label. Inactive: gray.

Style: clean, trustworthy, warm. NOT flashy.
Language: Japanese UI (user selected Japan)
```

---

## ━━ SECTION 1: ONBOARDING（タブバーなし・7ステップ）━━

---

### OB-1: Welcome / 言語選択

```
Design a mobile welcome screen (390×844px) for "China Travel Guide". No bottom tab bar.

- Hero top 55%: Great Wall photo, dark gradient overlay fading to white at bottom
- Centered on hero: white circular compass icon 48px with glow
- "China Travel Guide" white bold 28px
- "中国旅行のすべてがわかるコンパニオンアプリ" white 14px
- Feature chips: [Safe] [Offline対応] [10言語対応] white outlined

Bottom white card (rounded top 24px):
- "言語を選んでください" navy 18px semibold
- 2-column grid (each option 160×52px card):
  Row 1: [EN English] | [JA 日本語 ← selected: red border + checkmark]
  Row 2: [KO 한국어]  | [FR Français]
  Row 3: [DE Deutsch] | [ES Español]
- "はじめる →" red full-width button 52px
```

---

### OB-2: Passport + Trip Type（Step 2/7）

```
Design a mobile onboarding screen (390×844px) "China Travel Guide" Step 2/7. No bottom tab bar.

Top: red progress bar (2/7), "← Step 2 / 7"
Title: "旅の情報を教えてください" bold 26px
Subtitle: "最適なビザ情報をご案内します" gray

Section ①「パスポートの国籍」:
- Search field: "🔍 国名を検索..."
- Quick-select chips: [US アメリカ] [UK イギリス] [JP 日本 ← red selected]

Section ②「訪問の目的」:
- 3 cards full width 64px each:
  🗺 観光・休暇 / 観光、レジャー、文化体験  ← selected (red border + light red bg)
  💼 ビジネス / 会議、出張、商談
  🔄 トランジット（通過）/ 第三国への乗り継ぎ

Amber hint chip:
"💡 日本国パスポートお持ちの方は観光目的で30日間のビザ免除が適用されます。"

"続ける →" red button
```

---

### OB-3: Travel Style（Step 3/7）

```
Design a mobile onboarding screen (390×844px) "China Travel Guide" Step 3/7. No bottom tab bar.

Top: progress bar (3/7), back arrow
Title: "旅のスタイルは？" bold 26px
Subtitle: "各スタイルの規則とヒントをご案内します"
Label: "複数選択できます" gray small

2×3 grid (each card 164×100px, 12px radius):
  [🥾 徒歩・ハイキング ← selected: red border 2px + red tint + red dot badge]
  [🚲 サイクリング]
  [⚡ バイク・スクーター]
  [🚗 レンタカー]
  [👥 グループツアー]
  [🚄 高速鉄道 ← selected: red border + red dot]

Amber warning chip:
"⚠️ 中国では旅行スタイルによって特別な規則が適用される場合があります。"

"続ける →" red button
```

---

### OB-4: Entry Details（Step 4/7）【新規】

```
Design a mobile onboarding screen (390×844px) "China Travel Guide" Step 4/7. No bottom tab bar.

Top: progress bar (4/7), back arrow
Title: "旅行の詳細を教えてください" bold 26px
Subtitle: "リマインダーと旅程の計算に使用します"

Section「📍 入国予定ポート」:
- Dropdown card full width 60px: plane icon | "上海 浦東国際空港 (PVG)" | chevron
- Horizontal scroll chips: [PEK 北京] [PVG 上海 ← red selected] [CAN 広州] [CTU 成都]

Section「📅 出発日」:
- Date card: "2026年7月15日" navy bold 22px + "今日から87日後" gray small
- Calendar input area

Preview card (light blue bg):
"🔔 この日程をもとにリマインダーを設定します"
• 4月16日 — VPN設定を始めましょう（90日前）
• 6月15日 — WeChat登録（30日前）
• 7月1日  — Alipay設定（14日前）

"続ける →" red button
```

---

### OB-5a: Eligibility Result — ビザ免除30日

```
Design a mobile screen (390×844px) "China Travel Guide" — Visa free result. No bottom tab bar.

Header: "← ビザ資格の確認"

Large result card (white, center):
- Green checkmark icon 56px with glow
- "ビザ免除" green small caps
- "30日間" red bold 56px
- "日本国パスポートホルダーはビザ不要" gray 14px
- Divider
- Amber chip: "✓ 2026年12月31日まで有効"
- Gray note: "政策は変更される場合があります。更新情報をお知らせします。"

3 info cards:
Card 1「📋 入国要件」: パスポート有効期限6ヶ月以上 / 帰国便推奨 / 十分な所持金
Card 2「⏰ 滞在制限」: 最大30日 / 国内延長不可 / 再入国でリセット
Card 3「🔄 240時間トランジット」: トランジットは別規則 / タップして確認 →

"出発日を設定する" secondary button
"セットアップを続ける →" red primary button
```

---

### OB-5b: Eligibility Result — 240時間トランジット【新規】

```
Design a mobile screen (390×844px) "China Travel Guide" — 240-hour transit result. No bottom tab bar.

Header: "← ビザ資格の確認"

Result card:
- Blue clock icon 56px
- "トランジットビザ免除" blue label
- "240時間" navy bold 56px
- "最大10日間滞在可能"
- Amber chip: "✓ 2026年12月31日まで有効"

Conditions card (amber bg):
"⚠️ 適用条件"
• 第三国への出発チケットが必要
• 対象ポートからの入国のみ
• 滞在可能エリアに制限あり

Ports card:
"🛬 対象ポート（65カ所）"
Chips: [北京 PEK] [上海 PVG] [広州 CAN] [成都 CTU] [西安 XIY] [深圳 SZX] ...+59

"セットアップを続ける →" red button
```

---

### OB-5c: Eligibility Result — ビザ申請必要【新規】

```
Design a mobile screen (390×844px) "China Travel Guide" — Visa required result. No bottom tab bar.

Header: "← ビザ資格の確認"

Result card (calm, not alarming):
- Document icon 56px navy
- "ビザ申請が必要です" navy bold 22px
- "ご安心ください。ステップごとにご案内します。" gray
- Processing chip: "📅 通常4〜5営業日で発給"

Visa type selector:
"旅行目的を選んでください"
4 cards:
  🗺 Lビザ（観光）← selected red border
  💼 Mビザ（商用）
  🎓 Xビザ（留学）
  👥 Fビザ（交流・視察）

Required docs preview (for L visa):
"Lビザに必要な書類"
✓ パスポート（6ヶ月以上有効）
✓ 証明写真
✓ 航空券・ホテル予約（仮予約可）
✓ 申請フォーム（COVA）
"+ 詳細リストを見る"

"ビザ申請を追跡する →" red button
"申請の進捗をアプリで管理できます" note
```

---

### OB-6: Interests（Step 6/7）【新規】

```
Design a mobile onboarding screen (390×844px) "China Travel Guide" Step 6/7. No bottom tab bar.

Top: progress bar (6/7), back arrow
Title: "何に興味がありますか？" bold 26px
Subtitle: "旅程のおすすめに使用します"
Label: "複数選択できます"

2×3 grid (each card 164×88px):
  [🏯 文化・歴史 ← selected red] [🍜 グルメ・食 ← selected red]
  [🏔 自然・アウトドア]           [🛍 ショッピング]
  [🎭 エンターテイメント]         [🧘 ウェルネス・温泉]

Selected summary: "選択中: 文化・歴史, グルメ・食" gray small

"続ける →" red button
```

---

### OB-7: セットアップ完了（Step 7/7）【新規】

```
Design a mobile onboarding screen (390×844px) "China Travel Guide" Step 7/7 — final. No bottom tab bar.

Layout: celebration feel

Top: subtle confetti dots pattern on off-white bg

Center card (white, large rounded 20px):
- Green checkmark circle 64px with pulse ring
- "セットアップ完了！" navy bold 26px
- "中国への旅の準備を始めましょう" gray 16px

User profile recap (small cards):
  🇯🇵 日本 → 中国（観光・30日ビザ免除）
  ✈️ 出発 2026年7月15日（87日後）
  🚶🚄 徒歩・ハイキング、高速鉄道
  🏯🍜 文化・歴史、グルメ

Action card (amber bg):
"⚠️ 今すぐ対応が必要"
"VPN設定（出発90日前・期限超過）"
[今すぐ設定する →] amber button

"準備リストを見る →" red primary button full-width
"後で確認する" gray text link
```

---

## ━━ SECTION 2: PREPARE タブ（準備がアクティブ）━━

---

### PR-1: Prepare ダッシュボード

```
Design a mobile app screen (390×844px) "China Travel Guide" — PREPARE tab home.
Bottom tab bar: 準備● | 探す | 旅程 | レート | ツール

Top: "おはようございます、旅人さん 🇯🇵" gray small / "旅の準備を始めましょう" H1 / bell icon right

Departure hero card (red gradient full width 16px radius):
Left: "出発まで" small white + "87" white 56px bold + "日"
Right: "出発日" label + "2026年7月15日" white bold
Route: "→ 上海浦東国際空港（PVG）"
Progress: "準備の進捗" + red progress bar (36%) + "4 / 11 タスク完了"

Status row 2 cards:
Card L: ビザ状況 / ✅ "ビザ免除" green / "30日間 · 2026年12月まで有効"
Card R: 次のタスク / ⚠️ "VPNを設定する" red bold / "期限超過" red chip

チェックリスト section + "4/11 完了":
✅ gray strikethrough — パスポート確認済み
✅ gray strikethrough — ビザ状況を確認
✅ gray strikethrough — WeChatをダウンロード
✅ gray strikethrough — 旅行スタイルを選択
□ "VPNを設定する" bold + "緊急" red chip right
□ Alipayを設定
□ オフラインマップを準備
□ 緊急連絡先を保存
□ eSIM / SIMフリー端末を確認

Exchange quick card: "為替レート LIVE" / "100円 = 4.90元" bold / "+0.001" green

Quick tools row: ☀️ 天気 | 🗺 地図 | 文A 翻訳

Reminder banner (amber bg): 🔔 "次のリマインダー：5月6日 — VPNの設定状況を確認"
```

---

### PR-2: ビザ申請 進捗トラッカー【タブ修正: 旅程→準備】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Visa Progress Tracker.
Bottom tab bar: 準備● | 探す | 旅程 | レート | ツール  ← PREPARE tab active (FIXED)

Header: "← ビザ申請" / subtitle "Lビザ（観光）"
Chip: "✈ 出発まで87日" amber

Vertical stepper:
STEP 1 ✅ green: "書類チェックリスト" + "完了" green chip / "書類6点が揃いました"
STEP 2 🔄 red active (red left border, highlighted card):
  "オンライン申請（COVA）" + "進行中" red chip
  Input: "申請番号" placeholder "例：COVA-2026-XXXXXXXX"
  [🔗 COVAシステムを開く →] outlined button
  Sub-checklist: ✅アカウント作成 / ✅フォーム送信 / □書類アップロード / □番号保存
STEP 3 🔒 gray: "パスポート提出" / "ステップ2を完了してください"
STEP 4 🔒 gray: "審査待ち" / "通常5〜7営業日"
STEP 5 🔒 gray: "パスポートに貼付されて返却"

Unlock condition card (gray bg):
"次のステップの解除条件"
"COVAで書類をアップロードし申請番号を保存してください"

Reminder (amber bg): 🔔 "次のリマインダー：5月6日 — 申請状況を確認"
```

---

### PR-3: 出発前チェック タイムライン【タブ修正: 旅程→準備】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Pre-departure timeline.
Bottom tab bar: 準備● | 探す | 旅程 | レート | ツール  ← FIXED

Header: "← 出発前チェック"
Chips: "✈ 2026年7月15日 · 87日後" | "0/5 完了"

Timeline cards (colored left border):

🔴 RED border — OVERDUE:
"期限超過" red chip | "4月16日（90日前）"
"VPNを設定する" bold
"中国入国前に必ず完了すること"
"⚠️ 今すぐ対応してください" red
"設定ガイドを見る →" red link / radio empty right

🔵 BLUE border — TODAY:
"本日 今すぐ推奨" blue chip
"WeChat登録"
"中国国内では新規登録が難しい"
"ステップバイステップガイド →" blue link / radio empty

🔵 BLUE: "44日後 | 6月1日" / "Alipay Internationalを設定" / "外国クレジットカードを紐付ける"
🔵 BLUE: "83日後 | 7月8日" / "オフラインマップをダウンロード" / "Amapはオフラインでも動作"
🔵 BLUE: "89日後 | 7月14日" / "eSIM / SIMフリー端末を確認"
```

---

### PR-4: GFWガイド【タブ修正: 探す→準備】

```
Design a mobile app screen (390×844px) "China Travel Guide" — GFW Guide.
Bottom tab bar: 準備● | 探す | 旅程 | レート | ツール  ← FIXED

Header: "← 中国で使えるアプリ" / "使えるもの・使えないもの"
Red banner: "🔒 中国ではGFWにより多くのアプリが遮断されます。"

2-column list (left: 遮断 / right: 代替):
❌ Google Maps (地図)     →  ✅ Amap 高徳地図 [DL]
❌ Gmail                  →  ✅ QQ Mail / WeChat [DL]
❌ WhatsApp               →  ✅ WeChat 微信 [DL]
❌ Instagram              →  ⚠️ VPN必須
❌ Uber                   →  ✅ DiDi 滴滴 [DL]
❌ YouTube                →  ✅ Bilibili [DL]
❌ Google Search          →  ✅ Baidu 百度 [DL]

Download reminder card (blue bg):
"⬇️ 入国前にすべてダウンロードしてください"

VPN card (amber bg):
"⚠️ VPN設定ガイド — 中国入国前に必ず設定"
"VPNは中国国内でDLできません"
[VPN設定ガイドを見る →] amber button
```

---

### PR-5: 決済セットアップ【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Payment setup.
Bottom tab bar: 準備● | 探す | 旅程 | レート | ツール

Header: "← 決済セットアップ" / "中国でお金を使う3つの方法"
Progress: "1/3 完了" + bar 33%

3 method cards stacked:

CARD 1 ✅ green left border:
Alipay blue icon / "Alipay International（支付宝）" bold
"外国クレジットカード対応 · 16言語対応"
"✅ 設定済み" green / [設定を確認 →]

CARD 2 🔄 red left border (expanded, active):
WeChat green icon / "WeChat Pay（微信支付）" bold
"中国最大の決済アプリ"
⚠️ Amber note: "WeChat登録には既存ユーザーによる認証が必要です。日本にいる間に友人や家族に依頼してください。"
Sub-steps: ✅ アプリDL / □ アカウント登録（友人認証必要） / □ 外国カード紐付け
[ステップバイステップガイド →] red button

CARD 3 🔒 gray:
BOC Compass icon / "BOC Compass（中国銀行）" bold
"外国人専用 · 2025年新登場"
"WeChat設定後に解除"

Tips: "💡 複数の決済手段を持つことを推奨します"
```

---

### PR-6: 緊急連絡先【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Emergency contacts.
Bottom tab bar: 準備● | 探す | 旅程 | レート | ツール

Header: "← 緊急連絡先"
Subtitle: "オフライン対応 · 圏外でも確認できます"
Offline chip: "📡 オフライン保存済み" green

Emergency numbers card (red tint bg):
"🆘 中国緊急番号"
Large rows tap-to-call:
📞 110  警察
🔥 119  消防・救急
🚑 120  医療緊急
🛣 122  交通事故

Embassy section:
"🇯🇵 在中日本大使館" bold / 北京市朝陽区
📞 +86-10-6532-2361 [Call] [Copy]
Consulate chips: [上海] [広州] [重慶] [瀋陽] [青島]

Hospitals (2 cards):
🏥 北京和睦家 / "24時間・英語対応" / [電話] [地図]
🏥 上海和睦家 / "24時間・英語対応" / [電話] [地図]
```

---

## ━━ SECTION 3: EXPLORE タブ（探すがアクティブ）━━

---

### EX-1: Explore メイン【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — EXPLORE main.
Bottom tab bar: 準備 | 探す● | 旅程 | レート | ツール

Top: "探す" H1
Search: "🔍 都市、観光地、旅行スタイルを検索..."

Weather strip (horizontal scroll, city weather mini cards):
[🌤 北京 12°] [☀️ 上海 18°] [⛅ 成都 15°] [🌧 広州 22°] [☀️ 西安 14°]
"Open-Meteo" tiny source label

"旅行スタイル別ガイド" section:
Horizontal scroll cards (140×80px):
[🥾 徒歩・ハイキング ← red highlight (selected by user)]
[🚲 サイクリング ← red highlight]
[⚡ バイク・スクーター] [🚗 レンタカー] [👥 グループツアー] [🚄 高速鉄道]

"おすすめ都市" section:
2-column grid (164×120px photo cards):
[Beijing skyline] 北京 / 文化・歴史の中心
[Shanghai Bund]  上海 / 近代都市の象徴
[Chengdu panda]  成都 / パンダと四川料理
[Xi'an wall]      西安 / 兵馬俑と古都の魅力

Floating button above tab bar: [🗺 地図を見る] white card shadow
```

---

### EX-2: 地図ビュー【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Map view.
Bottom tab bar: 準備 | 探す● | 旅程 | レート | ツール

Full-screen map (OpenStreetMap style, top 60%):
- Clean map of China, major cities visible
- Red map pins: 📍 Beijing, Shanghai, Xi'an, Chengdu, Guangzhou, Yunnan

Floating search (white card over map):
[← Back] | "中国地図" | [list icon]
Search: "場所を検索..."

Filter chips over map: [全て] [ホテル] [観光地] [レストラン] [外国人可 ← toggle on]

Bottom sheet (white, partially visible):
"近くの情報"
Horizontal scroll location cards:
  [Photo] 北京 故宮 / ★4.8 / 外国人可 / 🗺
  [Photo] 万里の長城 / ★4.9 / 要予約
```

---

### EX-3: サイクリングガイド【タブ修正: ツール→探す】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Cycling guide.
Bottom tab bar: 準備 | 探す● | 旅程 | レート | ツール  ← FIXED

Header: "← 🚲 中国のサイクリング"
Hero card (blue gradient): "シェアバイクの使い方" / "全国300以上の都市で利用可能"
Stats chips: [✅ 合法] [⚠️ 都市規則あり] [📱 アプリ必須]

シェアバイクアプリ:
🚲 Hellobike（哈啰）/ ほぼ全都市 / WeChatミニ [DL]
🚲 Meituan Bike（美団）/ 主要都市 [DL]
🚲 DiDi Bike（滴滴）/ 一部都市 [DL]

都市別ルール:
🔴 杭州: "電動スクーター完全禁止。登録済みでも即没収。"
🟡 北京: "自転車専用レーン必須。"
🟡 上海: "市街地は午前7時以降規制あり。"

Tips: 専用レーンのみ / 駐輪は専用ラック / QR解錠はAlipay/WeChat必要

CTA: "Alipayのセットアップへ →" red
```

---

### EX-4: ドライブ・レンタカーガイド【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Driving guide.
Bottom tab bar: 準備 | 探す● | 旅程 | レート | ツール

Header: "← 🚗 中国でのドライブ"

CRITICAL card (large red bg white text):
"⛔ 重要"
"外国の運転免許証は中国では無効です"
"国際免許証（IDP）も認められません"

Options — "外国人が移動するには":
Card 1 ✅ Recommended: "現地ドライバーを雇う" / "最も確実。Trip.comで手配可能" / [探す →]
Card 2 ⚠️: "中国の免許を取得する" / "健康診断+筆記試験が必要" / [詳細 →]
Card 3 ℹ️: "電動キックボード・自転車" / "免許不要・多くの都市で可"

Restrictions:
"都市別ナンバー規制"
• 北京：末尾番号で曜日規制あり
• 上海：外地ナンバーは市街地制限

Amber tip: "💡 信頼できる現地ドライバーとの旅行を推奨します"
```

---

### EX-5: 都市詳細（北京）【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — City: Beijing.
Bottom tab bar: 準備 | 探す● | 旅程 | レート | ツール

Hero (top 35%): Beijing skyline photo, dark overlay
"北京" white bold 32px centered
Chips: [🏛 文化・歴史] [🍜 グルメ] [🚄 高鉄あり]

Quick info (4 columns, white cards): 🌡 12°C晴れ | ¥ 中程度 | 🚇 地下鉄完備 | 🌏 外国人◎

Sub-tabs: [概要●] [観光地] [グルメ] [宿泊] [交通]

Attractions:
Card: 故宮（紫禁城）/ ★4.9 / ¥60 / 外国人可 / 要オンライン予約
Card: 万里の長城（慕田峪）/ ★4.8 / ¥65 / ケーブルカーあり
Card: 天壇公園 / ★4.6 / ¥15

Weather card: Open-Meteo / 晴れ 12°C / 週間予報 mini bar chart

Access card: 北京首都/大興国際空港 → 市内：地下鉄（外国カード可）
```

---

## ━━ SECTION 4: MY TRIP タブ（旅程がアクティブ）━━

---

### MT-1: My Trip メイン【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — MY TRIP main.
Bottom tab bar: 準備 | 探す | 旅程● | レート | ツール

Top: "旅程" H1

"旅程テンプレート" section:
Label: "人気の旅程プラン"
Horizontal scroll (200×130px photo cards with gradient overlay):
[北京 3日間] 文化・歴史 / 故宮・長城・胡同
[上海 5日間] 都市・グルメ / 外灘・豫園
[成都 4日間] 自然・グルメ / パンダ・四川料理
[西安 3日間] 歴史 / 兵馬俑・城壁
[雲南 5日間] 自然 / 麗江・大理

"AI旅程プランナー" prominent card (blue-purple gradient):
✨ "AI旅程プランナー" bold white
"行きたい場所・日数・スタイルを入力するだけで旅程を自動生成します"
Mini form:
  "📍 行きたい都市：" [北京、上海        ]
  "📅 日数：" [7日間 ▼]
  "🎯 スタイル：" [文化・グルメ ▼]
[Claude.ai で旅程を作成 →] white button
"Claude.aiが旅程を生成します（無料）" small

"予約リンク" section:
✈️ Trip.com — フライト・ホテル・鉄道 [外国人向け →]
🏨 Booking.com — ホテル [→]
🚄 12306 (Trip.com経由) — 高速鉄道 [→]
```

---

### MT-2: 旅程テンプレート詳細（北京3日間）【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Itinerary: Beijing 3 days.
Bottom tab bar: 準備 | 探す | 旅程● | レート | ツール

Header: "← 北京 3日間" + [💾 保存] top right
Hero: Beijing photo 120px + "北京 · 3日間 · 文化・歴史" chips

Day tabs: [Day 1●] [Day 2] [Day 3] — Day 1 active red underline

Day 1 — "到着・故宮エリア" (vertical timeline):

🌅 午前:
📍 故宮（天安門広場）
"午前中の訪問を推奨" / ¥60 / 所要3〜4時間 / 要予約
[Booking.comで予約] small chip

🌞 午後:
📍 景山公園 / "故宮全景を一望" / ¥2 / 1時間
📍 南鑼鼓巷 / "伝統的路地・カフェ" / 無料 / 1〜2時間

🌙 夜:
🍜 王府井エリア / "屋台街・北京ダック"

Transport chip: "🚇 地下鉄1号線・8号線が便利"

[Trip.comで宿泊を予約 →] red button
```

---

## ━━ SECTION 5: RATES タブ（レートがアクティブ）━━

---

### RT-1: 為替レート

```
Design a mobile app screen (390×844px) "China Travel Guide" — Exchange Rates.
Bottom tab bar: 準備 | 探す | 旅程 | レート● | ツール

Header: "為替レート" H1 + 🔄 refresh right
Subtitle: "リアルタイム · 更新 14:32 JST" gray

Calculator card (white full width 16px radius):
"手持ちの金額を入力"
Input: "1000" + [JPY ▼] right
⇄ red icon center
Result: "¥ 47.83 CNY" red bold 36px
"CNY（人民元）" / "1 JPY = 0.04783 CNY" gray

Currency list (headers: 通貨 | レート(CNY) | 24H):
🇺🇸 USD 米ドル         7.24    ↑ +0.1% green
🇪🇺 EUR ユーロ         7.89    ↓ -0.2% red
🇯🇵 JPY 日本円 ← highlighted row
                      0.04783 ↑ +0.3% green
🇰🇷 KRW 韓国ウォン     0.0052  ↓ -0.1% red
🇬🇧 GBP 英国ポンド     9.12    ↑ +0.4% green
🇦🇺 AUD 豪ドル         4.67    ↓ -0.1% red
🇨🇦 CAD カナダドル     5.31    ↑ +0.2% green
🇸🇬 SGD シンガポール   5.44    ↑ +0.1% green

Footer: "出典：欧州中央銀行 / Frankfurter API"
```

---

## ━━ SECTION 6: TOOLS タブ（ツールがアクティブ）━━

---

### TL-1: Tools メイン【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — TOOLS main.
Bottom tab bar: 準備 | 探す | 旅程 | レート | ツール●

Top: "ツール" H1

2×2 large tool cards (each 164×140px rounded 16px):

[文A 翻訳] blue gradient:
  "文A" large white icon
  "翻訳" bold white
  "Google翻訳と連携" white small
  "カメラ翻訳も対応" white tiny

[🚖 DiDi配車] orange gradient:
  DiDi-style icon white
  "DiDi配車" bold white
  "中国版Uber" white small
  "1タップで起動" white tiny

[🗺 Amap] green gradient:
  Map pin white
  "Amap 高徳地図" bold white
  "中国最精度の地図" white small
  "オフライン対応" white tiny

[🆘 緊急連絡先] red gradient:
  SOS icon white
  "緊急連絡先" bold white
  "大使館・救急番号" white small
  "オフライン対応" white tiny

Quick reference card (white):
"中国 緊急番号クイックリファレンス"
Big: 📞 110 警察 | 🔥 119 消防 | 🚑 120 救急
[詳細を見る →]

Useful links:
🌐 中国天気予報（中央気象台）
🚄 高速鉄道時刻表（Trip.com）
🏥 外国人向け病院リスト
```

---

## ━━ SECTION 7: PROFILE / SETTINGS（新規追加）━━

---

### PF-1: プロフィール・設定メイン【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Profile & Settings.
No bottom tab bar (accessed via profile icon on dashboard top-right).

Header: "← プロフィール・設定"

User summary card (white, full width, rounded 16px):
  Left: large circle avatar with flag emoji 🇯🇵 (48px)
  Right:
    "旅人さん" bold 18px
    "🇯🇵 日本 → 中国 · 観光" gray 14px
    "✈️ 出発 2026年7月15日（87日後）" gray 12px
  Bottom row of chips: [🚶 徒歩] [🚄 高速鉄道] [🏯 文化] [🍜 グルメ]
  [プロフィールを編集 →] text link red small

Settings sections (grouped list style):

Section「旅行設定」:
  Row: 🌍 "出発国・国籍" → "日本 🇯🇵" right | chevron
  Row: 🎯 "旅行目的" → "観光・休暇" right | chevron
  Row: 🚶 "旅行スタイル" → "徒歩・高速鉄道" right | chevron
  Row: ✈️ "出発日" → "2026年7月15日" right | chevron

Section「通知・アラート」:
  Row: 🔔 "リマインダー通知" | toggle ON (red)
  Row: 📋 "ビザポリシー更新通知" | toggle ON (red)
  Row: 💱 "為替レートアラート" | toggle OFF (gray)
  Small note: "ビザポリシーが変更された場合にお知らせします"

Section「表示設定」:
  Row: 🌐 "表示言語" → "日本語" right | chevron
  Row: 💴 "基準通貨" → "JPY（日本円）" right | chevron

Section「オフラインデータ」:
  Row: 📱 "保存済みデータ" → "24.3 MB" right | chevron
  Row: 🗺 "オフラインマップ" → "未ダウンロード" gray right | [DL] red chip
  Row: 🔄 "データを更新" → "最終更新: 2026年4月6日"

Section「アプリ情報」:
  Row: 📄 "プライバシーポリシー" | chevron
  Row: ⚠️ "免責事項（ビザ情報）" | chevron
  Row: 💬 "フィードバックを送る" | chevron
  Row: ℹ️ "バージョン" → "1.0.0" gray right

Disclaimer card (amber bg, bottom):
  "⚠️ ビザ・入国情報は参考情報です。最新情報は必ず公式機関でご確認ください。"
```

---

### PF-2: プロフィール編集【新規】

```
Design a mobile app screen (390×844px) "China Travel Guide" — Edit Profile.
No bottom tab bar.

Header: "← プロフィールを編集" + [保存] red text button top-right

Content (editable fields):

Field「国籍・パスポート」:
  Label: "パスポートの国籍"
  Current: [🇯🇵 日本 ▼] dropdown full width
  Hint: "変更すると、ビザ情報が自動的に更新されます" amber small

Field「旅行目的」:
  3 selectable cards:
  🗺 観光・休暇 ← selected (red border)
  💼 ビジネス
  🔄 トランジット

Field「出発日」:
  Date input: "2026年7月15日" + calendar icon
  Hint: "変更するとリマインダーも自動更新されます" gray small

Field「入国予定ポート」:
  Dropdown: "上海 浦東国際空港 (PVG)" + chevron

Field「旅行スタイル」:
  2×3 grid (compact, 6 options):
  [🥾 徒歩 ← selected] [🚲 サイクリング] [⚡ バイク]
  [🚗 レンタカー] [👥 ツアー] [🚄 高速鉄道 ← selected]

Field「興味・関心」:
  2×3 grid:
  [🏯 文化 ← selected] [🍜 グルメ ← selected] [🏔 自然]
  [🛍 ショッピング] [🎭 エンタメ] [🧘 ウェルネス]

[変更を保存する →] red full-width button bottom
```

---

## ━━ 変更サマリー ━━

| 種別 | 画面 | 変更内容 |
|---|---|---|
| タブ修正 | GFWガイド | 探す → **準備** |
| タブ修正 | 出発前チェック | 旅程 → **準備** |
| タブ修正 | ビザ進捗 | 旅程 → **準備** |
| タブ修正 | サイクリング | ツール → **探す** |
| 新規 | OB-4 Entry Details | 入国ポート＋出発日入力 |
| 新規 | OB-5b 240h Transit | トランジット免除分岐 |
| 新規 | OB-5c Visa Required | ビザ申請必要分岐 |
| 新規 | OB-6 Interests | 興味選択 |
| 新規 | OB-7 完了画面 | セットアップ完了 |
| 新規 | PR-5 決済 | Alipay/WeChat/BOC |
| 新規 | PR-6 緊急連絡先 | Prepareタブ内 |
| 新規 | EX-1 Explore Main | 地図＋天気＋都市一覧 |
| 新規 | EX-2 地図 | マップビュー |
| 新規 | EX-4 ドライブ | 外国免許無効の説明 |
| 新規 | EX-5 都市詳細 | 北京サンプル |
| 新規 | MT-1 My Trip | テンプレ＋AI＋予約 |
| 新規 | MT-2 旅程詳細 | 北京3日間 |
| 新規 | TL-1 Tools | 翻訳/DiDi/Amap/緊急 |
| 新規 | PF-1 プロフィール・設定 | 右上アイコンからアクセス |
| 新規 | PF-2 プロフィール編集 | 設定変更フォーム |

**生成順序：共通システム → OB-1〜7 → PR-1〜6 → EX-1〜5 → MT-1〜2 → RT-1 → TL-1 → PF-1〜2**
**総画面数：25画面**
