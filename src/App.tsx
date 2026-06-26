import React, { useState, useEffect } from 'react';

interface ArticleContent {
  newspaperName: string;
  website: string;
  date: string;
  section: string;
  page: string;
  mainHeadline: string;
  subHeadlineBold: string;
  subHeadlineText: string;
  paragraph1Title: string;
  paragraph1Text: string;
  paragraph2Title: string;
  paragraph2Text: string;
  quoteText: string;
  quoteAuthor: string;
  imageCaption: string;
  imageCredit: string;
  imageUrls: string;
}
// 1. KLISTRA IN INITIAL_STATE HÄR:
const INITIAL_STATE = {
  newspaperName: "BORÅS TIDNING",
  website: "bt.se",
  date: "MÅNDAG 15 JUNI 2026",
  section: "SPORT",
  page: "23",
  mainHeadline: "Karl Ydreskog Ronaldos efterträdare i fotboll",
  subHeadlineBold: "FOTBOLL. ",
  subHeadlineText: "Fritsla IF:s ytter Karl Ydreskog tar fotbollsvärlden med storm och pekas ut som Ronaldos självklara efterträdare. Med sin snabbhet, teknik och målsinne jämförs han redan med den portugisiska stjärnan.",
  paragraph1Title: "FRITSLA. ",
  paragraph1Text: "Det är en välförtjänt utmärkelse för Karl Ydreskog som på kort tid gjort stort avtryck i Fritsla IF och i fotbollssverige.\n\n– Karl har en otrolig arbetsmoral och en vinnarskalle utöver det vanliga. Han vill alltid framåt och gör lagkamraterna bättre, säger tränare Fredrik \"Bullen\" Petterson.\n\nMed sin fart längs kanten, vassa dribblingar och förmåga att avgöra matcher har Ydreskog blivit en publikfavorit och ett ständigt hot för motståndarförsvaret.",
  paragraph2Title: "Redan jagad av storklubbar",
  paragraph2Text: "Trots sin unga ålder uppges flera allsvenska klubbar ha scoutat honom regelbundet. Fritsla IF vill dock behålla sin stjärna så länge som möjligt.\n\n– Vi är stolta över Karl, men vi vet att han har en ljus framtid framför sig. Vårt jobb är att pokračera utveckla honom, säger sportchefen Axel \"klevliden\" Lindelöf.\n\nSjälv drömmer Karl om att en dag spela i de größten ligorna.\n\n– Ronaldo har varit min stora idol sedan jag var liten. Att höra sitt namn i samma mening är overkligt...",
  quoteText: "Karl har en otrolig arbetsmoral och en vinnarskalle utöver det vanliga. Han vill alltid framåt och gör lagkamraterna bättre.",
  quoteAuthor: "FREDRIK \"BULLEN\" PETTERSON, TRÄNARE FRITSLA IF",
  imageCaption: "Karl Ydreskog hyllas som Ronaldos efterträdare i fotboll.",
  imageCredit: "FOTO: FRITSLA IF",
  imageUrls: "noah.png"
};

export default function App() {
  const [content, setContent] = useState<ArticleContent>(() => {
    const savedData = localStorage.getItem('tidnings_artikel_data');
    return savedData ? JSON.parse(savedData) : INITIAL_STATE;
  });

  const [showEditor, setShowEditor] = useState<boolean>(false);

  // 3. KLISTRA IN DETTA PRECIS UNDER STATEN:
  useEffect(() => {
    localStorage.setItem('tidnings_artikel_data', JSON.stringify(content));
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };
  // BYT UT DIN GAMLA handleImageUpload MED DENNA:
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Använd FileReader för att göra om bilden till en textsträng (Base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        // Sparar i statet vilket automatiskt sparar i localStorage nu
        setContent(prev => ({
          ...prev,
          imageUrls: base64String
        }));
      };

      reader.readAsDataURL(file);
    }
  };


  return (

    <div style={{ backgroundColor: '#fcfbf7', minHeight: '100vh', padding: '20px', fontFamily: '"Times New Roman", Times, serif', color: '#111' }}>
      {/* KLISTRA IN DETTA PRECIS I BÖRJAN AV RETURN-SATSEN */}
      <style>{`
  .newspaper-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }
  .editor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  /* Om skärmen är en mobil (max 768px bred) */
  @media (max-width: 768px) {
    .newspaper-grid {
      grid-template-columns: 1fr !important; /* Blir 1 kolumn istället för 2 */
      gap: 20px !important;
    }
    .editor-grid {
      grid-template-columns: 1fr !important; /* Redigeringsverktyget blir 1 kolumn */
    }
    .editor-span-2 {
      grid-column: span 1 !important;
    }
    .newspaper-header h1 {
      font-size: 32px !important; /* Tidningsnamnet krymper på mobilen */
    }
    .main-headline {
      font-size: 32px !important; /* Rubriken krymper på mobilen */
    }
  }
`}</style>

      {/* TIDNINGSSIDA */}
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>

        {/* Tidningshuvud */}
        <div style={{ borderBottom: '4px solid #000', paddingBottom: '5px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '42px', fontWeight: '900', letterSpacing: '1px', margin: 0, flexGrow: 1 }}>
              {content.newspaperName}
            </h1>
            <span style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>{content.website}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #000', marginTop: '5px', paddingTop: '3px', fontSize: '11px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            <div>{content.date}</div>
            <div>
              <span style={{ marginRight: '15px', letterSpacing: '2px' }}>{content.section}</span>
              <span>{content.page}</span>
            </div>
          </div>
        </div>

        {/* Huvudrubrik */}
        <h2 style={{ fontSize: '46px', lineHeight: '1.05', fontWeight: 'bold', margin: '10px 0 20px 0', letterSpacing: '-0.5px' }}>
          {content.mainHeadline}
        </h2>

        {/* Layout i spalter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* Vänsterkolumn */}
          <div style={{ fontSize: '14px', lineHeight: '1.45', textAlign: 'justify' }}>
            <p style={{ margin: '0 0 15px 0', fontSize: '14.5px' }}>
              <strong style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', letterSpacing: '0.5px' }}>{content.subHeadlineBold}</strong>
              {content.subHeadlineText}
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '15px 0' }} />

            <p style={{ margin: '0 0 15px 0', whiteSpace: 'pre-line' }}>
              <strong style={{ fontFamily: 'Arial, sans-serif', fontSize: '12.5px' }}>{content.paragraph1Title}</strong>
              {content.paragraph1Text}
            </p>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '20px 0 5px 0', fontFamily: 'Georgia, serif' }}>
              {content.paragraph2Title}
            </h3>
            <p style={{ margin: '0 0 15px 0', whiteSpace: 'pre-line' }}>
              {content.paragraph2Text}
            </p>
          </div>

          {/* Högerkolumn */}
          <div>
            <div style={{ backgroundColor: '#eee', width: '100%', minHeight: '300px', position: 'relative' }}>
              <img
                src={content.imageUrls}
                alt="Artikelbild"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'Arial, sans-serif', marginTop: '6px', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 'bold', maxWidth: '75%' }}>{content.imageCaption}</div>
              <div style={{ color: '#666', whiteSpace: 'nowrap' }}>{content.imageCredit}</div>
            </div>

            {/* ERSÄTT DET GAMLA CITATBLOCKET MED DETTA: */}
            <div style={{ display: 'flex', alignItems: 'flex-start', borderTop: '2px solid #000', paddingTop: '15px' }}>
              <span style={{ fontSize: '90px', color: '#004B87', fontFamily: 'Georgia, serif', lineHeight: '0.3', marginRight: '15px', fontWeight: 'bold', userSelect: 'none' }}>
                ”
              </span>
              <div style={{ fontFamily: 'Georgia, serif', flexGrow: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.35', margin: '0 0 10px 0', color: '#111' }}>
                  {content.quoteText}
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'Arial, sans-serif', color: '#555', letterSpacing: '0.5px', fontWeight: 'bold' }}>
                  {content.quoteAuthor}
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>

      {/* KNAPP FÖR ATT ÖPPNA EDITORN */}
      <div style={{ maxWidth: '800px', margin: '100px auto 20px auto', textAlign: 'center', borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
        <button
          onClick={() => setShowEditor(!showEditor)}
          style={{ padding: '10px 20px', fontSize: '14px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#004B87', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          {showEditor ? '✖ Dölj redigeringsverktyg' : '⚙ Visa redigeringsverktyg'}
        </button>
      </div>

      {/* REDIGERINGSPANEL */}
      {showEditor && (
        <div style={{ maxWidth: '800px', margin: '0 auto 50px auto', backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '8px', border: '1px solid #d0d7de', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#004B87' }}>Redigera tidningsartikeln</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Tidningens namn:</label>
              <input type="text" name="newspaperName" value={content.newspaperName} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Huvudrubrik:</label>
              <input type="text" name="mainHeadline" value={content.mainHeadline} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            {/* Ändra "FOTBOLL." fetstilt tagg */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Kategori (Fetstilt i ingress):</label>
              <input type="text" name="subHeadlineBold" value={content.subHeadlineBold} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>



            {/* Ändra "FRITSLA." fetstilt tagg */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Ort/Plats (Fetstilt i brödtext):</label>
              <input type="text" name="paragraph1Title" value={content.paragraph1Title} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Ingress (Underrubrik):</label>
              <textarea name="subHeadlineText" value={content.subHeadlineText} onChange={handleChange} rows={2} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Brödtext Stycke 1:</label>
              <textarea name="paragraph1Text" value={content.paragraph1Text} onChange={handleChange} rows={5} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Mellanrubrik Stycke 2:</label>
              <input type="text" name="paragraph2Title" value={content.paragraph2Title} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Brödtext Stycke 2:</label>
              <textarea name="paragraph2Text" value={content.paragraph2Text} onChange={handleChange} rows={5} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Bildtext:</label>
              <input type="text" name="imageCaption" value={content.imageCaption} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Bildkredit:</label>
              <input type="text" name="imageCredit" value={content.imageCredit} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            {/* KLISTRA IN DETTA INUTI REDIGERINGSPANELEN (DÄR DU VILL HA INPUT-FÄLTEN): */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Datum:</label>
              <input type="text" name="date" value={content.date} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Stort citat (Blå text):</label>
              <textarea name="quoteText" value={content.quoteText} onChange={handleChange} rows={2} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Citatbärare (Vem sa det):</label>
              <input type="text" name="quoteAuthor" value={content.quoteAuthor} onChange={handleChange} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
            </div>
            {/* Bilduppladare: */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px', color: '#004B87' }}>Välj bild från datorn:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ width: '100%', padding: '4px', boxSizing: 'border-box', border: '1px dashed #004B87', borderRadius: '4px', backgroundColor: '#fff' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
