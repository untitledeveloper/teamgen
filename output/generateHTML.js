function generateHTML(data) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Company Employees</title>
    </head>
    <body>
        
        <style id="reset_css">
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article, aside, details, figcaption, figure, 
            footer, header, hgroup, menu, nav, section {
                display: block;
            }
            body {
                line-height: 1;
            }
            ol, ul {
                list-style: none;
            }
            blockquote, q {
                quotes: none;
            }
            blockquote:before, blockquote:after,
            q:before, q:after {
                content: '';
                content: none;
            }
            table {
                border-collapse: collapse;
                border-spacing: 0;
            }
        </style>

        <style id="style_css">

            h1 {
                font-size: 32px;
            }

            h2 {
                font-size: 20px;
            }

            body {
                background-color: rgb(12, 12, 12);
            }

            .header {
                color: rgb(255, 255, 255);
                background-color: rgb(12, 12, 12);
                text-align: center;
                padding: 20px;
            }

            .card{
                margin: 30px;
                width: 200px;
                border-radius: 15px;
                background-color: rgb(12, 12, 12);
                box-shadow: 0px 2px 9px 3px rgba(0, 0, 0, 0.637);
            }

            .card_header {
                font-weight: bold;
                background-color: rgb(227, 240, 116);
                border-radius: 15px 15px 0 0;
                padding: 15px;
            }

            .card_body {
                padding: 15px;
                font-size: 18px;
                color: rgb(255, 255, 255);
            }

            .card_content {
                padding-bottom: 10px;
            }

            .card_layout {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                padding-top: 30px;
                padding-bottom: 30px;
                padding-left: 50px;
                padding-right: 50px;
            }
        </style>
      
        <header class="header">
            <h1>Company Employees</h1>
        </header>

        <div class="card_layout">
            
          ${makeCards(data)}
            
        </div>
    
    </body>
  </html>
`;
};
function makeCards(data) {
  return data
    .map(x => {
      let position = x.getRole();
      switch (position) {
        case "Manager":
          return makeManagerCard(x);
          break;
        case "Engineer":
          return makeEngineerCard(x);
          break;
        case "Intern":
          return makeInternCard(x);
          break;
      }
    })
    .join("\n");
}
function makeManagerCard(x) {
  console.log(x);
  let mangerCard = `

  <div class="card">
      <div class="card_header">
          <h2>${x.name}</h2>
          <p>${x.getRole()}</p>
      </div>

      <div class="card_body">
          <p class="card_content">Unique ID: ${x.id}</p>
          <p class="card_content">Email: ${x.email}</p>
          <p class="card_content">Office Number: ${x.officeNumber}</p>
      </div>
  </div>
`;
  return mangerCard;
}
function makeEngineerCard(x) {
  let engineerCard = `

  <div class="card">
      <div class="card_header">
          <h2>${x.name}</h2>
          <p>${x.getRole()}</p>
      </div>

      <div class="card_body">
          <p class="card_content">Unique ID: ${x.id}</p>
          <p class="card_content">Email: ${x.email}</p>
          <p class="card_content">Github: ${x.github}</p>
      </div>
  </div>
  `;
  return engineerCard;
}
function makeInternCard(x) {
  let internCard = `

  <div class="card">
      <div class="card_header">
          <h2>${x.name}</h2>
          <p>${x.getRole()}</p>
      </div>

      <div class="card_body">
          <p class="card_content">Unique ID: ${x.id}</p>
          <p class="card_content">Email: ${x.email}</p>
          <p class="card_content">School: ${x.school}</p>
      </div>
  </div>
  `;
  return internCard;
}

module.exports = generateHTML;