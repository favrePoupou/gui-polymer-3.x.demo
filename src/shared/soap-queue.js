
/*@licence
Copyright GardaWorld Inc
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SoapQueue extends PolymerElement {        

       static get properties() {
          queue: { type: Array, value: function () { return []; } },
          busy:  { type: Boolean, computed: 'computeBusy(queue.*)' },
        },

        computeBusy() {
          return this.queue.length > 0;
        },

        has(uniqueId) {
          for (var c of this.queue) {
            var el = c.has(uniqueId);
            if (el) {
              return el;
            }
          }
          return null;
        },

        search(method, parameters, element) {
          for (var c of this.queue) {
            if ((!method || c.method === method) && (!parameters || _.isEqual(parameters, c.parameters)) && (!element || _.includes(c.hostElements, element))) {
              return c;
            }
          }
          return null;
        },

        add(method, parameters, hostElement, cb, icon, msg, noIdUpdate, noNotifyPaths, noEndEdit, parseResponse) {
          if (this.search(method, parameters)) {
            return null;
          }

          var h = [];

          if (_.isArray(hostElement)) {
            h = hostElement;
          }
          else {
            h.push(hostElement);
          }

          var el;

          var che = _.clone(h);
          for (el of che) {
            if (el._popupEditing && !_.includes(h, el._popupEditing)) {
              h.push(el._popupEditing);
            }
          }

          var c = document.createElement('soap-call');
          c.method = method;
          c.parameters = parameters;
          c.hostElements = h;
          c.noIdUpdate = noIdUpdate || this.noIdUpdate;
          c.noNotifyPaths = noNotifyPaths || this.noNotifyPaths;
          c.noEndEdit = noEndEdit || this.noEndEdit;
          c.cb = cb;
          c.parseResponse = parseResponse;
          this.push('queue', c);

          this.fire('queue-started', h, c);

          // This should be move inside the editable behavior
          // We should break the link between the elements itself and the soap queue (and call)
          for (el of h) {
            if (el.disable) {
              el.disable();
            }
            if (el.removeErrors) {
              el.removeErrors();
            }
          }

          if (msg) {
            c.addMessageToQueue(icon, msg, 5, c.invoke.bind(c), c.cancel.bind(c));
          }
          else {
            c.invoke();
          }

          return c;
        },

        remove(c) {
          var i = this.queue.indexOf(c);
          if (i !== -1) {
            this.splice('queue', i, 1);
          }
          this.fire('queue-completed', c.hostElements, c);
          c.hostElements = undefined;
        },

        done(c) {
          if (!c._done) {
            c.done();
          }
          this.remove(c);
        },

        cancel(c) {
          if (!c._cancel) {
            c.cancel();
          }
          this.remove(c);
        },

        removeHostElement(element) {
          if (_.isArray(element)) {
            for (var el of element) {
              this.removeHostElement(el);
            }
          }
          else {
            for (var c of this.queue) {
              var i = c.hostElements.indexOf(element);
              if (i !== -1) {
                c.splice('hostElements', i, 1);
              }
            }
          }
        }

        }

window.customElements.define('soap-queue', SoapQueue);

   