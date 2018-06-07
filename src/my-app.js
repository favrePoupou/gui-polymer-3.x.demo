
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';
import './shared-styles.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);
// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {

 static get template(){
    return html`
     <style include="shared-styles">
        *//* Change placeholder text inside inputs *//*
        ::-webkit-input-placeholder {
          *//* Chrome/Opera/Safari *//*
          color: #d7d7d7;
        }
        ::-moz-placeholder {
          *//* Firefox 19+ *//*
          color: #d7d7d7;
        }
        :-ms-input-placeholder {
          *//* IE 10+ *//*
          color: #d7d7d7;
        }
        :-moz-placeholder {
          *//* Firefox 18- *//*
          color: #d7d7d7;
        }

        body {
          font-family: 'Open Sans', Arial, sans-serif;
          font-size: 16px;
        }

        h3 {
          font-weight: bold;
          font-size: 1.5rem;
          text-align: center;
          color: #303133;
        }

        h4 {
          font-size: 1.2rem;
          color: #3a74cb;
        }

        .subscribe-container {
          text-align: center;
          margin: 2em auto;
          padding: 1em;
          width: 90%;
          max-width: 500px;
          background-color: #fff;
        }

        .mc_embed_signup input.required {
          font-size: 16px;
          border: none;
          border-bottom: 1px solid #d7d7d7;
          margin: 20px 0;
          padding: 5px 20px 5px 10px;
          outline: none;
          width: 100%;
          font-family: 'Open Sans', Arial, sans-serif;
          box-sizing: border-box;
        }

        .mc_embed_signup input#mc-embedded-subscribe {
          background: #3a74cb;
          font-size: .8rem;
          color: #fff;
          border-radius: 40px;
          padding: 12px 35px;
          box-shadow: none;
          outline: none;
          border: none;
          cursor: pointer;
          margin: 4em auto;
          display: block;
          transition: 0.2s ease background;
          font-family: 'Open Sans', Arial, sans-serif;
          font-weight: 700;
        }

        .error-message {
          display: none;
          color: red;
          text-align: center;
          font-size: .8em;
        }



        @media screen and (orientation:portrait) {
             img {
                width: 10%;
                height: auto;
            }
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 40%;
                }
         }
        @media screen and (orientation:landscape) {
             img {
                width: 10%;
                height: auto;
            }
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 20%;
                }
         }
</style>
      <img src="/images/logo_en.png" width="1" height="1" class="center">
         <div class="subscribe-container">
          <div class="mc_embed_signup">
            <h3>Authentification</h3>
            <form>
              <div id="mc_embed_signup_scroll">
                <div class="mc-field-group">
                  <input type="text" value="[[user.username]]" placeholder="Nom utilisateur" name="username" class="required" id="uname">
                </div>
                <div class="mc-field-group">
                  <input type="password" value="[[user.password]]" placeholder="Mot de passe" name="password" class="required password" id="pwd">
                </div>
                <input type="button" value="Ok" on-click="submit">
              </div>
            </form>
          </div>
    `;
  }

static get properties() {
  return {
    user: {
      type: String
    },
  };
}

constructor() {
    super();
    this.user = {
    username: 'external@example.com',
    password: 'testing'
    };
}

  findLanguage() {
   var language = navigator.language || navigator.userLanguage;
   console.log('language', language);
  }

  submit(){
    console.log('VALUE', this.user.username);
  }


}


window.customElements.define('my-app', MyApp);
