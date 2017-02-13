"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('todo/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _emberfireAdaptersFirebase) {
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({});
});
define('todo/app', ['exports', 'ember', 'todo/resolver', 'ember-load-initializers', 'todo/config/environment'], function (exports, _ember, _todoResolver, _emberLoadInitializers, _todoConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _todoConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _todoConfigEnvironment['default'].podModulePrefix,
    Resolver: _todoResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _todoConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('todo/components/todo-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'li',
    editing: false,
    doubleClick: function doubleClick() {
      window.ev = event;
      this.toggleProperty('editing');
      console.log(event);
      console.log(this.$(event.target));
      this.$(event.target).focus();
    },
    actions: {
      markAsCompleted: function markAsCompleted(todo) {
        console.log('component action');
        this.sendAction('toggleCompletion', todo);
      },
      saveTodo: function saveTodo(todo) {
        this.set('editing', false);
        window.todo = todo;
        console.log(todo.get('title'));
        todo.save();
      },
      destroyTodo: function destroyTodo(todo) {
        console.log('Destroying item: ', todo);
        todo.destroyRecord();
      }
    }
  });
});
define('todo/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('todo/controllers/todos', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    todos: _ember['default'].computed.alias('model'),
    active: _ember['default'].computed.filterBy('todos', 'isCompleted', false),
    activeCount: _ember['default'].computed.alias('active.length'),
    completed: _ember['default'].computed.filterBy('todos', 'isCompleted', true),
    completedCount: _ember['default'].computed.alias('completed.length'),
    newTodo: '',
    actions: {
      toggleCompletion: function toggleCompletion(todo) {
        console.log('controller action');
        var t = this.store.findRecord('todo', todo);
        t.toggleProperty('isCompleted');
        t.save();
      },
      createTodo: function createTodo(text) {
        var todo = this.store.createRecord('todo', {
          title: text.trim(),
          isCompleted: false
        });
        todo.save();
        this.set('newTodo', '');
      },
      destroyCompletedTodos: function destroyCompletedTodos() {
        console.log('Destroy Completed');
        var todos = this.get('completed');
        todos.map(function (t) {
          t.destroyRecord();
        });
      }
    }
  });
});
// controllers/todos.js
define('todo/controllers/todos/active', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    todos: _ember['default'].computed.filterBy('model', 'isCompleted', false),
    actions: {
      toggleCompletion: function toggleCompletion(todo) {
        todo.toggleProperty('isCompleted');
        todo.save();
      }
    }
  });
});
define('todo/controllers/todos/completed', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    todos: _ember['default'].computed.filterBy('model', 'isCompleted', true),
    actions: {
      toggleCompletion: function toggleCompletion(todo) {
        todo.toggleProperty('isCompleted');
        todo.save();
      }
    }
  });
});
define('todo/controllers/todos/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    todos: _ember['default'].computed.alias('model'),
    actions: {
      toggleCompletion: function toggleCompletion(todo) {
        todo.toggleProperty('isCompleted');
        todo.save();
      }
    }
  });
});
define('todo/helpers/app-version', ['exports', 'ember', 'todo/config/environment'], function (exports, _ember, _todoConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _todoConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('todo/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('todo/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('todo/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'todo/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _todoConfigEnvironment) {
  var _config$APP = _todoConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('todo/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('todo/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('todo/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('todo/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('todo/initializers/export-application-global', ['exports', 'ember', 'todo/config/environment'], function (exports, _ember, _todoConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_todoConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _todoConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_todoConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('todo/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('todo/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('todo/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("todo/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('todo/models/todo', ['exports', 'ember-data'], function (exports, _emberData) {

  var Todo = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    isCompleted: _emberData['default'].attr('boolean')
  });

  exports['default'] = Todo;
});
define('todo/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('todo/router', ['exports', 'ember', 'todo/config/environment'], function (exports, _ember, _todoConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _todoConfigEnvironment['default'].locationType,
    rootURL: _todoConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('todos', { path: '/' }, function () {
      // this.route('index');
      this.route('active');
      this.route('completed');
    });
  });

  exports['default'] = Router;
});
define('todo/routes/todos', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var todos = this.store.findAll('todo');
      console.log(todos.get('length'));
      return todos;
    }
  });
});
define('todo/routes/todos/active', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('todo/routes/todos/completed', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('todo/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('todo/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _emberfireServicesFirebaseApp) {
  exports['default'] = _emberfireServicesFirebaseApp['default'];
});
define('todo/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _emberfireServicesFirebase) {
  exports['default'] = _emberfireServicesFirebase['default'];
});
define("todo/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Kc3e6ZRH", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"footer\",[]],[\"static-attr\",\"id\",\"info\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Double-click to edit a todo\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todo/templates/application.hbs" } });
});
define("todo/templates/components/todo-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5s666OjB", "block": "{\"statements\":[[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"todo\",\"isCompleted\"]],\"completed\"],null]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"class\",\"toggle\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"markAsCompleted\",[\"get\",[\"todo\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"editing\"]]],null,1,0],[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"destroy\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"destroyTodo\",[\"get\",[\"todo\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"todo\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveTodo\",[\"get\",[\"todo\"]]],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"autofocus\",\"class\"],[[\"get\",[\"todo\",\"title\"]],\"true\",\"todo-item-editing\"]]],false],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\"],[\"hidden\",[\"get\",[\"todo\",\"id\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "todo/templates/components/todo-item.hbs" } });
});
define("todo/templates/todos", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "JQZc04pr", "block": "{\"statements\":[[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"todoapp\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"header\",[]],[\"static-attr\",\"id\",\"header\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Do your work.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"placeholder\",\"value\",\"enter\"],[\"new-todo\",\"Whatcha got?\",[\"get\",[\"newTodo\"]],\"createTodo\"]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"main\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"id\",\"todo-list\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"footer\",[]],[\"static-attr\",\"id\",\"footer\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"id\",\"todo-count\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"activeCount\"]],false],[\"close-element\"],[\"text\",\" todos left\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"id\",\"filters\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"todos.index\"],null,2],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"todos.active\"],null,1],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"todos.completed\"],null,0],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"clear-completed\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"destroyCompletedTodos\"]],[\"flush-element\"],[\"text\",\"\\n      Clear completed (\"],[\"append\",[\"unknown\",[\"completedCount\"]],false],[\"text\",\")\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Completed\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Active\"]],\"locals\":[]},{\"statements\":[[\"text\",\"All\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "todo/templates/todos.hbs" } });
});
define("todo/templates/todos/active", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "41SAP797", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"todos\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"todo-item\"],null,[[\"todo\",\"toggleCompletion\"],[[\"get\",[\"item\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleCompletion\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"item\"]}],\"hasPartials\":false}", "meta": { "moduleName": "todo/templates/todos/active.hbs" } });
});
define("todo/templates/todos/completed", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "i3LRtaql", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"todos\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"todo-item\"],null,[[\"todo\",\"toggleCompletion\"],[[\"get\",[\"item\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleCompletion\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"item\"]}],\"hasPartials\":false}", "meta": { "moduleName": "todo/templates/todos/completed.hbs" } });
});
define("todo/templates/todos/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YhKkZMd5", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"todos\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"todo-item\"],null,[[\"todo\",\"toggleCompletion\"],[[\"get\",[\"item\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleCompletion\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"item\"]}],\"hasPartials\":false}", "meta": { "moduleName": "todo/templates/todos/index.hbs" } });
});
define('todo/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('todo/config/environment', ['ember'], function(Ember) {
  var prefix = 'todo';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("todo/app")["default"].create({"name":"todo","version":"0.0.0+4997dd2f"});
}

/* jshint ignore:end */
//# sourceMappingURL=todo.map
