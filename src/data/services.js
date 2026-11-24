// One page per service at /services/<slug>/ — each aimed at what people
// actually search for (e.g. "art framing tokyo", "額装 東京").
// `projects` are slugs from projects.js shown as examples.
// `enquiry` preselects the service on the contact form.

export const services = [
  {
    slug: 'framing',
    enquiry: 'Framing',
    img: '/images/services/framing.jpg',
    metaTitle: { en: 'Custom Art Framing in Tokyo', ja: '東京のオーダー額装・アート額装' },
    metaDescription: {
      en: 'Museum-standard custom framing in Tokyo for paintings, prints, photographs and works on paper. Archival materials, made in collaboration with Juka Framing.',
      ja: '東京で絵画・版画・写真・紙作品のオーダー額装を承ります。アーカイバル素材を用い、Juka Framingとの協働で美術館水準の額装に仕上げます。',
    },
    kicker: { en: 'Framing', ja: '額装' },
    title: { en: 'Custom art framing in Tokyo', ja: '東京のオーダー額装' },
    intro: {
      en: 'Every work is framed to museum standard, using archival materials chosen for that piece. We frame for private collectors, artists, galleries and companies across Tokyo — from a single print or a child\'s drawing to a full exhibition — in collaboration with Juka Framing, the workshop founded by our co-founder Yuki Kakuno. Past framing includes work for Ceysson & Bénétière\'s Ginza gallery, the Tokyo American Club, Toranomon Hills and GINZA SIX.',
      ja: 'すべての作品を、その一点のために選んだアーカイバル素材で、美術館水準に額装します。東京を拠点に、個人のコレクター、アーティスト、ギャラリー、企業の作品を、一枚の版画や子どもの絵から展覧会全体まで手がけています。額装は、共同創業者のYuki Kakunoが設立した工房、Juka Framingとの協働で行います。これまでに、Ceysson & Bénétière（銀座）、東京アメリカンクラブ、虎ノ門ヒルズ、GINZA SIXの作品の額装を担当してきました。',
    },
    offerHeading: { en: 'What we frame', ja: '額装の種類' },
    offers: [
      {
        title: { en: 'Classic framing with mats', ja: 'マット付きのクラシック額装' },
        desc: {
          en: 'Window mats cut to suit the work, with archival boards that protect it over time.',
          ja: '作品に合わせて窓を切り抜いたマットと、長期にわたり作品を守るアーカイバルボードを使用します。',
        },
      },
      {
        title: { en: 'Floating frames', ja: 'フローティングフレーム' },
        desc: {
          en: 'The work is raised inside the frame so its edges stay visible — ideal for deckle-edged paper.',
          ja: '作品を額の中に浮かせるように配置し、紙の縁まで見せる額装です。耳付きの紙作品に適しています。',
        },
      },
      {
        title: { en: 'Acrylic boxes', ja: 'アクリルボックス' },
        desc: {
          en: 'Clear boxes for three-dimensional pieces and objects.',
          ja: '立体作品やオブジェのための透明なアクリルケースです。',
        },
      },
      {
        title: { en: 'Canvas frames & stretching', ja: 'キャンバス用フレーム・キャンバス張り' },
        desc: {
          en: 'L-shaped frames for canvases, and stretching for paintings that arrive rolled.',
          ja: 'キャンバス作品のためのL字フレームと、丸めた状態で届いた作品のキャンバス張りを承ります。',
        },
      },
      {
        title: { en: 'Glass & acrylic glazing', ja: 'ガラス・アクリル' },
        desc: {
          en: 'Standard glass, non-reflective glass or acrylic, chosen for the work and where it will hang.',
          ja: '標準ガラス、反射防止ガラス、アクリルから、作品と飾る場所に合わせて選びます。',
        },
      },
    ],
    stepsHeading: { en: 'How it works', ja: 'ご依頼の流れ' },
    steps: [
      {
        en: 'Tell us about the work. Its size and a photo are a good start — the enquiry form asks for both.',
        ja: '作品についてお聞かせください。サイズと写真があればスムーズです。お問い合わせフォームからお送りいただけます。',
      },
      {
        en: 'We propose frame, mat and glazing options, with a quote.',
        ja: 'フレーム、マット、ガラスの組み合わせをご提案し、お見積もりをお送りします。',
      },
      {
        en: 'We make the frame by hand, and can deliver and install it for you.',
        ja: 'フレームを手仕事で制作します。お届けと設置も承ります。',
      },
    ],
    link: { label: { en: 'Visit Juka Framing', ja: 'Juka Framingのサイトへ' }, href: 'https://www.jukaframing.com' },
    projects: ['ceysson-benetiere-may-2026', 'tokyo-american-club', 'sapphire-lounge-may-2026', 'mariya-suzuki-feb-2026'],
    cta: { en: 'Get a framing quote', ja: '額装のお見積もり' },
  },
  {
    slug: 'art-consultancy',
    enquiry: 'Art Consultancy',
    img: '/images/services/art-curation.jpg',
    metaTitle: { en: 'Art Consultancy in Tokyo', ja: '東京のアートコンサルティング' },
    metaDescription: {
      en: 'Art consultancy in Tokyo for collectors, companies and first-time buyers: curation, artist sourcing and commissions, acquisition advice, framing and installation.',
      ja: '東京を拠点に、コレクター、企業、初めてアートを購入する方へアートコンサルティングを提供。キュレーション、作家の紹介やコミッション、購入のアドバイスから、額装・設置まで。',
    },
    kicker: { en: 'Art consultancy', ja: 'アートコンサルティング' },
    title: { en: 'Art consultancy in Tokyo', ja: '東京のアートコンサルティング' },
    intro: {
      en: 'We help people and organisations find art that belongs in their space — then take care of everything that follows. Studio Kaku works with first-time buyers, collectors, offices and developers, drawing on a network of Japanese and international artists. Clients include Mitsui Fudosan, Soho House and Tokyo Creative Salon at Haneda Airport.',
      ja: '空間にふさわしいアートを見つけ、その後のすべてを引き受けます。Studio Kakuは、初めて作品を購入する方からコレクター、オフィス、デベロッパーまで、国内外のアーティストのネットワークを生かしてサポートします。これまでに三井不動産、Soho House、羽田空港のTokyo Creative Salonなどと仕事をしてきました。',
    },
    offerHeading: { en: 'What we do', ja: 'サービス内容' },
    offers: [
      {
        title: { en: 'Curation', ja: 'キュレーション' },
        desc: {
          en: 'A curatorial direction for each space — what the art should do there, and why. Not a mood board, but a point of view.',
          ja: 'それぞれの空間でアートが果たすべき役割と、その理由を示します。イメージの羅列ではなく、一つの視点としてのご提案です。',
        },
      },
      {
        title: { en: 'Sourcing & commissions', ja: '作品の調達・コミッション' },
        desc: {
          en: 'Existing works, or new pieces commissioned for your space. We handle negotiation, contracts and timelines.',
          ja: '既存の作品、またはその空間のために制作を依頼する新作。作家との交渉、契約、進行管理まで担います。',
        },
      },
      {
        title: { en: 'Acquisition advice', ja: '購入のアドバイス' },
        desc: {
          en: 'Honest guidance on what you are buying, whether it is your first piece or a growing collection.',
          ja: '初めての一点から、育てていくコレクションまで、作品について率直にアドバイスします。',
        },
      },
      {
        title: { en: 'Framing, installation & handover', ja: '額装・設置・引き渡し' },
        desc: {
          en: 'Museum-standard framing and installation, with full documentation — artists, provenance and care.',
          ja: '美術館水準の額装と設置。作家情報、来歴、メンテナンス方法をまとめたドキュメントもお渡しします。',
        },
      },
    ],
    stepsHeading: { en: 'Ways to work with us', ja: 'ご依頼の形式' },
    steps: [
      {
        en: 'One-off project — a single piece, a room or a whole building, scoped and priced individually.',
        ja: 'スポットプロジェクト：一点の作品から一室、建物全体まで、個別にスコープと費用を設定します。',
      },
      {
        en: 'Retainer — ongoing access to our network, eye and advice.',
        ja: 'リテイナー：私たちのネットワーク、審美眼、アドバイスを継続的にご利用いただけます。',
      },
      {
        en: 'Advisory — you have a team, and want an outside eye and a second opinion.',
        ja: 'アドバイザリー：すでにチームがあり、外部の視点やセカンドオピニオンが欲しい場合に。',
      },
    ],
    projects: ['kyoto-sequence-art', 'arthur-harmonyst', 'get-it-studios', 'duncan-swann'],
    cta: { en: 'Start an enquiry', ja: 'お問い合わせ' },
  },
  {
    slug: 'hotel-art-curation',
    enquiry: 'Art Consultancy',
    img: '/projects/kyoto-sequence-art/restaurant-bar-night-10.jpg',
    metaTitle: { en: 'Art Curation for Hotels in Japan', ja: 'ホテル・旅館のアートキュレーション' },
    metaDescription: {
      en: 'Art curation and installation for hotels, ryokan and hospitality in Tokyo and across Japan — from a single lobby to a full property, with works by Japanese artists.',
      ja: '東京・日本各地のホテル、旅館、ホスピタリティ施設のためのアートキュレーションと設置。ロビー一つから施設全体まで、日本のアーティストの作品で空間をつくります。',
    },
    kicker: { en: 'Hotels & hospitality', ja: 'ホテル・ホスピタリティ' },
    title: { en: 'Art curation for hotels', ja: 'ホテルのためのアートキュレーション' },
    intro: {
      en: 'Art shapes how guests remember a stay. We curate, source, frame and install art for hotels, ryokan and hospitality spaces — from a single lobby or restaurant to every room in the property — and manage it all as your one point of contact. Past work includes the art curation for Mitsui Fudosan\'s Sequence hotels in Kyoto and Tokyo, and projects with Soho House.',
      ja: 'アートは、ゲストが滞在をどう記憶するかを形づくります。私たちはホテル、旅館、ホスピタリティ空間のために、アートのキュレーション、調達、額装、設置を行います。ロビーやレストラン一か所から、客室を含む施設全体まで、窓口を一つにしてすべてを管理します。これまでに、三井不動産のSequenceホテル（京都・東京）のアートキュレーションや、Soho Houseとのプロジェクトを手がけてきました。',
    },
    offerHeading: { en: 'What we do', ja: 'サービス内容' },
    offers: [
      {
        title: { en: 'A single space', ja: '一つの空間' },
        desc: {
          en: 'A lobby, restaurant or bar, given a distinct character through art and objects.',
          ja: 'ロビー、レストラン、バーなど一つの空間に、アートとオブジェで個性を与えます。',
        },
      },
      {
        title: { en: 'The whole property', ja: '施設全体' },
        desc: {
          en: 'Art for every space, common areas and rooms, with one creative thread running through it all.',
          ja: '共用部から客室まで、すべての空間に一貫したテーマでアートを選びます。',
        },
      },
      {
        title: { en: 'An ongoing programme', ja: '継続的なプログラム' },
        desc: {
          en: 'Rotating exhibitions, artist residencies and seasonal updates, managed by us.',
          ja: '入れ替え展示、アーティスト・イン・レジデンス、季節ごとの更新を私たちが運営します。',
        },
      },
      {
        title: { en: 'Japanese artists', ja: '日本のアーティスト' },
        desc: {
          en: 'Paintings, ceramics, sculpture and print from our network of Japanese artists — originals, editions and commissions.',
          ja: '絵画、陶芸、彫刻、版画まで。私たちのネットワークの日本人アーティストによるオリジナル、エディション、コミッション作品をご提案します。',
        },
      },
    ],
    stepsHeading: { en: 'How it works', ja: 'ご依頼の流れ' },
    steps: [
      {
        en: 'We visit the property and get to know the space, the light and the story you want guests to feel.',
        ja: '施設を訪れ、空間や光、ゲストに感じてほしいストーリーを理解します。',
      },
      {
        en: 'We propose a curatorial direction and a selection of works for each space.',
        ja: 'キュレーションの方向性と、空間ごとの作品セレクションをご提案します。',
      },
      {
        en: 'We source, frame, ship and install everything, and hand over full documentation.',
        ja: '作品の調達、額装、輸送、設置までを行い、ドキュメント一式をお渡しします。',
      },
    ],
    projects: ['kyoto-sequence-art', 'sequence-suidobashi', 'tokyo-american-club'],
    cta: { en: 'Talk to us about your property', ja: '施設についてご相談ください' },
  },
  {
    slug: 'art-installation',
    enquiry: 'General',
    img: '/images/services/shipment-and-installation.webp',
    metaTitle: { en: 'Art Installation & Hanging in Tokyo', ja: '東京の美術品設置・展示' },
    metaDescription: {
      en: 'Art installation in Tokyo for homes, offices, galleries and exhibitions: transport, hanging and installation managed from start to finish, with one point of contact.',
      ja: '東京で、住まい・オフィス・ギャラリー・展覧会の美術品設置を承ります。輸送から展示・設置まで、ひとつの窓口で最後まで管理します。',
    },
    kicker: { en: 'Installation', ja: '設置' },
    title: { en: 'Art installation in Tokyo', ja: '東京の美術品設置' },
    intro: {
      en: 'Hanging art well is a craft. We plan the layout, handle transport and logistics, and install works safely and precisely — for private homes, offices, galleries and exhibitions. You have one point of contact from start to finish, and nothing falls through the gaps.',
      ja: 'アートを美しく掛けることは、ひとつの技術です。レイアウトの計画から輸送・ロジスティクス、安全で正確な設置まで。住まい、オフィス、ギャラリー、展覧会のために、最初から最後までひとつの窓口で対応します。',
    },
    offerHeading: { en: 'What we do', ja: 'サービス内容' },
    offers: [
      {
        title: { en: 'Hanging & layout', ja: 'レイアウトと展示' },
        desc: {
          en: 'Placement planned around the space, the light and how people move through it.',
          ja: '空間、光、人の動きを踏まえて配置を計画します。',
        },
      },
      {
        title: { en: 'Exhibition installation', ja: '展覧会の設営' },
        desc: {
          en: 'Full installation for gallery shows and exhibitions, including framing where needed.',
          ja: 'ギャラリーの展覧会や展示の設営をすべて行います。必要に応じて額装も承ります。',
        },
      },
      {
        title: { en: 'Transport & logistics', ja: '輸送・ロジスティクス' },
        desc: {
          en: 'Careful transport of works to and from your space, managed end to end.',
          ja: '作品の搬入・搬出を、最初から最後まで丁寧に管理します。',
        },
      },
      {
        title: { en: 'Large-scale installations', ja: '大型インスタレーション' },
        desc: {
          en: 'Site-specific work in public spaces, such as our installations at Haneda Airport for Tokyo Creative Salon.',
          ja: 'Tokyo Creative Salonでの羽田空港のインスタレーションのような、公共空間でのサイトスペシフィックな作品。',
        },
      },
    ],
    stepsHeading: { en: 'How it works', ja: 'ご依頼の流れ' },
    steps: [
      {
        en: 'Tell us about the works and the space — photos and sizes help.',
        ja: '作品と空間について教えてください。写真やサイズがあるとスムーズです。',
      },
      {
        en: 'We plan the layout and logistics, and send a quote.',
        ja: 'レイアウトと輸送の計画を立て、お見積もりをお送りします。',
      },
      {
        en: 'We deliver and install, and leave the space ready.',
        ja: '搬入・設置を行い、空間を整えてお引き渡しします。',
      },
    ],
    projects: ['ceysson-benetiere-may-2026', 'duncan-swann', 'tcs-2025', 'body-language'],
    cta: { en: 'Start an enquiry', ja: 'お問い合わせ' },
  },
];
