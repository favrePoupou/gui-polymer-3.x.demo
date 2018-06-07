
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class Login extends PolymerElement {
  static get template() {
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
    user: { type: String },
    isLogging : { type: Boolean, value: false },

// Later on using I18N
    _locales: {
            type:  Object,
            value: {
              en: {
                title:    'Authentification …',
                username: 'Username',
                password: 'Password',
                confirm:  'OK',
              },
              fr: {
                title:    'Authentification …',
                username: 'Nom d\'utilisateur',
                password: 'Mot de passe',
                confirm:  'OK',
              },
            }
          }
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
    console.log('Username Value :', this.user.username);
    console.log('Password Value :', this.user.password);

    var that = this;  
    this.isLogging = true;       
        gsked.app.user.login(this.user.username, this.user.password, true, function (err, result) {
          if (err) {
            if (_.isString(err.label)) {
              gsked.error(err);
            }

            that.lastError = gsked.globals.lastError;
            gsked.globals.lastError = null;

            that.isLogging = false;

            that.fire('onLoginError');
          }
          else {
            var branchKeys = _.keys(gsked.app.services.gui.branches);
            if (branchKeys.length === 0) {
              gsked.error('Branches not found.');
              return new Promise(function (resolve, reject) { reject(); });
            }
            else {
              var branch = _.first(branchKeys);
              gsked.app.user.setContext(gsked.app.user.app.name, branch, function (err, result) {
/* 
  you can retrieve the language at result.profile.language
  you can retrieve the fullname at result.profile.fullname
*/

                if (err) {
                  that.fire('onBranchSelectError', err);
                }
                else {
                  that.async(that.close);
                }
              });
            }
          }
        });
  } // Submit()
}

window.customElements.define('my-login', Login);
