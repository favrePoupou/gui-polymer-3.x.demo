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
import '@polymer/paper-checkbox/paper-checkbox.js';
import './my-icons.js';
import './shared-styles.js';
import './user.js';
import './home.js';
import './shared/session-manager.js';


// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);
// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {

 static get template(){

  return html` 
  <!-- app-location binds to the app's URL -->
  <app-location route="{{route}}"></app-location>

  <!-- this app-route manages the top-level routes -->
  <app-route
  route="{{route}}"
  pattern="/:view"
  data="{{routeData}}"
  tail="{{subroute}}">
  </app-route>


  <!-- iron-pages selects the view based on the active route -->
  <iron-pages selected="[[routeData.view]]" attr-for-selected="name" fallback-selection="view404">

  <my-user name="" route="{{subroute}}"></my-user>
  <my-user name="user" route="{{subroute}}"></my-user>
  <my-login name="login" route="{{subroute}}"></my-login>
  <my-home name="home" route="{{subroute}}"></my-home>
  <my-view1 name="view1" route="{{subroute}}"></my-view1>
  <my-view2 name="view2" route="{{subroute}}"></my-view2>
  <my-view3 name="view3" route="{{subroute}}"></my-view3>
  <my-view404 name="view404" route="{{subroute}}"></my-view404>
  </iron-pages>
  <!--<my-session></my-session>-->
  `;
}

static get observers() {
  return [
  '_routeChanged(route.*)',
  '_viewChanged(routeData.view)'
  ]
}

_routeChanged(changeRecord) {
  if (changeRecord.path === 'path') {  
  }
}

_viewChanged(view) {
  switch (view) {  
    case '/':
    import('./user.js');
    break;
    case '/user':
    import('./user.js');
    break; 
     case '/home':
    import('./home.js');
    break;
    case 'login':
    import('./login.js');
    break;    
    case 'view1':
    import('./my-view1.js');
    break;
    case 'view2':
    import('./my-view2.js');
    break;
    case 'view3':
    import('./my-view3.js');
    break;
    case 'view404':
    import('./my-view404.js');
    break;    
  }
}

}

window.customElements.define('my-app', MyApp);