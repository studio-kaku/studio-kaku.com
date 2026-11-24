// Japanese for the short, repeated text in projects.js (taglines, subtitles,
// credit labels, dates). Anything not listed here (artist and venue names)
// is shown as written. Longer, one-off text lives on each project as
// titleJa / descriptionJa.

const terms = {
  // Titles, taglines & subtitles
  'Private Commission': '個人のご依頼',
  'Private commission': '個人のご依頼',
  'Private framing': '個人の額装',
  'Framing': '額装',
  'Exhibition': '展覧会',
  'Group Exhibition': 'グループ展',
  'Floating frame': 'フローティングフレーム',
  'Canvas stretching': 'キャンバス張り',
  'Curation & direction': 'キュレーション・ディレクション',
  'Curation & installation': 'キュレーション・設置',
  'Curation and talk event': 'キュレーション・トークイベント',
  'Curation, framing & installation': 'キュレーション・額装・設置',
  'Framing & installation': '額装・設置',
  'Project management': 'プロジェクトマネジメント',
  'Project & exhibition management': 'プロジェクト・展覧会マネジメント',
  'Creative direction & artist management': 'クリエイティブディレクション・アーティストマネジメント',
  'Creative Direction & Artist Management': 'クリエイティブディレクション・アーティストマネジメント',
  'Creative direction & installation': 'クリエイティブディレクション・設置',
  'Artist management, curation, framing & installation': 'アーティストマネジメント・キュレーション・額装・設置',
  'POLYGON1993 Artist Management': 'POLYGON1993 アーティストマネジメント',
  'Art curation': 'アートキュレーション',
  'Interior design': 'インテリアデザイン',
  'Conal Kelley at UltraSuperNew KURA': 'Conal Kelley（UltraSuperNew KURA）',
  'Maya Sobchuk at UltraSuperNew KURA': 'Maya Sobchuk（UltraSuperNew KURA）',
  'Wandler × Isetan × Kamei Norihiko': 'Wandler × 伊勢丹 × Kamei Norihiko',
  'Tokyo Creative Salon, Haneda Airport': 'Tokyo Creative Salon・羽田空港',
  'Jaski Gallery, Amsterdam': 'Jaski Gallery（アムステルダム）',
  'UltraSuperNew Gallery, Tokyo': 'UltraSuperNew Gallery（東京）',
  'Sequence Suidobashi, Tokyo': 'Sequence Suidobashi（東京）',

  // Credit labels
  'Venue': '会場',
  'Fair': 'アートフェア',
  'Framing & Installation': '額装・設置',
  'Tokyo Gendai': '東京現代',
  'Client': 'クライアント',
  'Photography': '撮影',
  'Photographer': '撮影',
  'Speaker': '登壇者',
  'Curation': 'キュレーション',
  'Curation & Direction': 'キュレーション・ディレクション',
  'Curation & Installation': 'キュレーション・設置',
  'Curation, Framing & Installation': 'キュレーション・額装・設置',
  'Canvas Stretching': 'キャンバス張り',
  'Artist': 'アーティスト',
  'Artists': 'アーティスト',
  'Artist Manager': 'アーティストマネージャー',
  'Gallery': 'ギャラリー',
  'Brand': 'ブランド',
  'Filmmaker': '映像',
  'Distribution Company': '販売代理店',
  'Creative Direction & Art Curation': 'クリエイティブディレクション・アートキュレーション',
  'Creative Director': 'クリエイティブディレクター',
  'Art Director': 'アートディレクター',
  'Art Direction': 'アートディレクション',
  'Art Curation': 'アートキュレーション',
  'Interior Design': 'インテリアデザイン',
  'Project & Exhibition Management': 'プロジェクト・展覧会マネジメント',
  'Production Company': '制作会社',
  'Location': '場所',
  'Technician': 'テクニシャン',
  'Framer': '額装',
  'Team': 'チーム',
  'Role': '担当',

  // Credit values
  'Isetan Shinjuku': '伊勢丹新宿店',
  'The Harmonyst, Hiroo': 'The Harmonyst（広尾）',
  'Haneda Airport Terminal 1': '羽田空港 第1ターミナル',
  'Haneda Airport Terminal 2': '羽田空港 第2ターミナル',
  'Haneda Airport Terminal 3': '羽田空港 第3ターミナル',
  'Mitsui Fudosan': '三井不動産',
  'Ueshima Coffee Company': 'UCC上島珈琲',
  'Tokyo American Club': '東京アメリカンクラブ',

  // Descriptions shared by several entries
  'Private framing commission.': '個人のお客様からご依頼いただいた額装です。',
};

const months = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

export function ja(text) {
  if (!text) return text;
  const date = text.match(/^([A-Z][a-z]+) (\d{4})$/);
  if (date && months[date[1]]) return `${date[2]}年${months[date[1]]}月`;
  if (/^\d{4}$/.test(text)) return `${text}年`;
  return terms[text] ?? text;
}
