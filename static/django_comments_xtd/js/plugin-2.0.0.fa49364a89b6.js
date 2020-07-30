webpackJsonp([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(37);

var _jquery2 = _interopRequireDefault(_jquery);

var _django = __webpack_require__(58);

var _django2 = _interopRequireDefault(_django);

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _remarkable = __webpack_require__(38);

var _remarkable2 = _interopRequireDefault(_remarkable);

var _commentform = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = exports.Comment = function (_React$Component) {
  _inherits(Comment, _React$Component);

  function Comment(props) {
    _classCallCheck(this, Comment);

    var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

    _this.state = {
      current_user: props.settings.current_user,
      removal: props.data.flags.removal.active,
      removal_count: props.data.flags.removal.count,
      like: props.data.flags.like.active,
      like_users: props.data.flags.like.users || [],
      dislike: props.data.flags.dislike.active,
      dislike_users: props.data.flags.dislike.users || [],
      reply_form: {
        component: null,
        show: false
      }
    };
    _this.action_like = _this.action_like.bind(_this);
    _this.action_dislike = _this.action_dislike.bind(_this);
    _this.handle_reply_click = _this.handle_reply_click.bind(_this);
    return _this;
  }

  _createClass(Comment, [{
    key: '_get_username_chunk',
    value: function _get_username_chunk() {
      var username = this.props.data.user_name,
          moderator = "";

      if (this.props.data.user_url && !this.props.data.is_removed) username = _react2.default.createElement(
        'a',
        { href: this.props.data.user_url },
        username
      );

      if (this.props.data.user_moderator) {
        var label = _django2.default.gettext("moderator");
        moderator = _react2.default.createElement(
          'span',
          null,
          '\xA0',
          _react2.default.createElement(
            'span',
            { className: 'label label-default' },
            label
          )
        );
      }
      return _react2.default.createElement(
        'span',
        null,
        username,
        moderator
      );
    }
  }, {
    key: '_get_right_div_chunk',
    value: function _get_right_div_chunk() {
      var flagging_html = "",
          moderate_html = "",
          url = "";

      if (this.props.data.is_removed) return "";

      if (this.props.settings.allow_flagging) {
        var inappropriate_msg = "";
        if (this.state.removal) {
          inappropriate_msg = _django2.default.gettext("I flagged it as inappropriate");
          flagging_html = _react2.default.createElement('span', { className: 'glyphicon glyphicon-flag text-danger',
            title: inappropriate_msg });
        } else {
          if (this.props.settings.is_authenticated) {
            url = this.props.settings.flag_url.replace('0', this.props.data.id);
          } else {
            url = this.props.settings.login_url + "?next=" + this.props.settings.flag_url.replace('0', this.props.data.id);
          }
          inappropriate_msg = _django2.default.gettext("flag comment as inappropriate");
          flagging_html = _react2.default.createElement(
            'a',
            { className: 'mutedlink', href: url },
            _react2.default.createElement('span', { className: 'glyphicon glyphicon-flag',
              title: inappropriate_msg })
          );
        }
      }

      if (this.props.settings.is_authenticated && this.props.settings.can_moderate) {
        var remove_msg = _django2.default.gettext("remove comment");
        url = this.props.settings.delete_url.replace('0', this.props.data.id);
        moderate_html = _react2.default.createElement(
          'a',
          { className: 'mutedlink', href: url },
          _react2.default.createElement('span', { className: 'glyphicon glyphicon-trash', title: remove_msg })
        );
        if (this.state.removal_count > 0) {
          var fmts = _django2.default.ngettext("A user has flagged this comment as inappropriate.", "%s users have flagged this comment as inappropriate.", this.state.removal_count);
          var text = _django2.default.interpolate(fmts, [this.state.removal_count]);
          moderate_html = _react2.default.createElement(
            'span',
            null,
            moderate_html,
            '\xA0',
            _react2.default.createElement(
              'span',
              { className: 'label label-warning', title: text },
              this.state.removal_count
            )
          );
        }
      }

      return _react2.default.createElement(
        'p',
        { className: 'pull-right' },
        flagging_html,
        ' ',
        moderate_html
      );
    }
  }, {
    key: '_get_feedback_chunk',
    value: function _get_feedback_chunk(dir) {
      if (!this.props.settings.allow_feedback) return "";
      var attr_list = dir + "_users"; // Produce (dis)like_users

      var show_users_chunk = "";
      if (this.props.settings.show_feedback) {

        // Check whether the user is no longer liking/disliking the comment,
        // and be sure the list list of users who liked/disliked the comment
        // is up-to-date likewise.
        var current_user_id = this.state.current_user.split(":")[0];
        var user_ids = this.state[attr_list].map(function (item) {
          return item.split(":")[0];
        });
        if (this.state[dir] && // If user expressed opinion, and
        user_ids.indexOf(current_user_id) == -1) // user is not included.
          {
            // Append user to the list.
            this.state[attr_list].push(this.state.current_user);
          } else if (!this.state[dir] && // If user doesn't have an opinion
        user_ids.indexOf(current_user_id) > -1) // user is included.
          {
            // Remove the user from the list.
            var pos = user_ids.indexOf(current_user_id);
            this.state[attr_list].splice(pos, 1);
          }

        if (this.state[attr_list].length) {
          var users = this.state[attr_list].map(function (item) {
            return item.split(":")[1];
          });
          users = users.join("<br/>");
          show_users_chunk = _react2.default.createElement(
            'a',
            { className: 'cfb-counter', 'data-toggle': 'tooltip', title: users },
            _react2.default.createElement(
              'span',
              { className: 'small' },
              this.state[attr_list].length
            )
          );
        }
      }

      var css_class = this.state[dir] ? '' : 'mutedlink';
      var icon = dir == 'like' ? 'thumbs-up' : 'thumbs-down';
      var class_icon = "small glyphicon glyphicon-" + icon;
      var click_hdl = dir == 'like' ? this.action_like : this.action_dislike;
      var opinion = "",
          link = "#";
      if (dir == 'like') opinion = _django2.default.gettext('I like it');else opinion = _django2.default.gettext('I dislike it');

      return _react2.default.createElement(
        'span',
        null,
        show_users_chunk,
        '  ',
        _react2.default.createElement(
          'a',
          { href: '#', onClick: click_hdl,
            className: css_class },
          _react2.default.createElement('span', { className: class_icon, title: opinion })
        )
      );
    }
  }, {
    key: 'render_feedback_btns',
    value: function render_feedback_btns() {
      if (this.props.settings.allow_feedback) {
        var feedback_id = "feedback-" + this.props.data.id;
        if (this.props.settings.show_feedback) this.destroyTooltips(feedback_id);
        var like_feedback = this._get_feedback_chunk("like");
        var dislike_feedback = this._get_feedback_chunk("dislike");
        return _react2.default.createElement(
          'span',
          { id: feedback_id, className: 'small' },
          like_feedback,
          _react2.default.createElement(
            'span',
            { className: 'text-muted' },
            ' | '
          ),
          dislike_feedback
        );
      } else return "";
    }
  }, {
    key: 'handle_reply_click',
    value: function handle_reply_click(event) {
      event.preventDefault();
      var component = this.state.reply_form.component;
      var visible = !this.state.reply_form.show;
      if (component == null) component = _react2.default.createElement(_commentform.CommentForm, { form: this.props.settings.form,
        reply_to: this.props.data.id,
        send_url: this.props.settings.send_url,
        current_user: this.props.settings.current_user,
        is_authenticated: this.props.settings.is_authenticated,
        on_comment_created: this.props.on_comment_created });
      this.setState({ reply_form: { component: component,
          show: visible } });
    }
  }, {
    key: '_get_reply_link_chunk',
    value: function _get_reply_link_chunk() {
      if (!this.props.data.allow_reply) return "";

      var separator = "";
      if (this.props.settings.allow_feedback) separator = _react2.default.createElement(
        'span',
        { className: 'text-muted' },
        '\u2022'
      );
      var url = this.props.settings.reply_url.replace('0', this.props.data.id);
      var reply_label = _django2.default.gettext("Reply");

      return _react2.default.createElement(
        'span',
        null,
        '\xA0\xA0',
        separator,
        '\xA0\xA0',
        _react2.default.createElement(
          'a',
          { className: 'small mutedlink', href: url,
            onClick: this.handle_reply_click },
          reply_label
        )
      );
    }
  }, {
    key: 'rawMarkup',
    value: function rawMarkup() {
      var md = new _remarkable2.default();
      var rawMarkup = md.render(this.props.data.comment);
      return { __html: rawMarkup };
    }
  }, {
    key: 'render_comment_body',
    value: function render_comment_body() {
      if (this.props.data.is_removed) return _react2.default.createElement(
        'p',
        { className: 'text-muted' },
        _react2.default.createElement(
          'em',
          null,
          this.props.data.comment
        )
      );else return _react2.default.createElement('div', { className: 'content', dangerouslySetInnerHTML: this.rawMarkup() });
    }
  }, {
    key: 'render_reply_form',
    value: function render_reply_form() {
      if (!this.state.reply_form.show) return "";
      return _react2.default.createElement(
        'div',
        null,
        this.state.reply_form.component
      );
    }
  }, {
    key: '_post_feedback',
    value: function _post_feedback(flag) {
      _jquery2.default.ajax({
        method: 'POST',
        url: this.props.settings.feedback_url,
        data: { comment: this.props.data.id, flag: flag },
        dataType: 'json',
        cache: false,
        statusCode: {
          201: function () {
            var state = {};
            if (flag == 'like') this.setState({ like: true, dislike: false });else if (flag == 'dislike') this.setState({ dislike: true, like: false });
          }.bind(this),
          204: function () {
            if (flag == 'like') this.setState({ like: false });else if (flag == 'dislike') this.setState({ dislike: false });
          }.bind(this)
        },
        error: function (xhr, status, err) {
          debugger;
          if (xhr.status == 400 && xhr.responseJSON.non_field_errors.length) alert(xhr.responseJSON.non_field_errors[0]);else console.error(this.props.settings.feedback_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: 'action_like',
    value: function action_like(event) {
      event.preventDefault();
      if (this.props.settings.is_authenticated) return this._post_feedback('like');else return window.location.href = this.props.settings.login_url + "?next=" + this.props.settings.like_url.replace('0', this.props.data.id);
    }
  }, {
    key: 'action_dislike',
    value: function action_dislike(event) {
      event.preventDefault();
      if (this.props.settings.is_authenticated) return this._post_feedback('dislike');else return window.location.href = this.props.settings.login_url + "?next=" + this.props.settings.dislike_url.replace('0', this.props.id);
    }
  }, {
    key: 'is_hover',
    value: function is_hover(elem) {
      return elem.parentElement.querySelector(':hover') === elem;
    }
  }, {
    key: 'destroyTooltips',
    value: function destroyTooltips(feedback_id) {
      // console.log("feedback_id = "+feedback_id);
      var elem = document.getElementById(feedback_id);
      var is_hover = elem && this.is_hover(elem);
      if (elem && !is_hover) {
        (0, _jquery2.default)('#' + feedback_id + ' A[data-toggle="tooltip"]').tooltip('destroy');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var feedback_id = "feedback-" + this.props.data.id;
      var options = { html: true, selector: '.cfb-counter' };
      (0, _jquery2.default)('#' + feedback_id).tooltip(options);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var feedback_id = "feedback-" + this.props.data.id;
      var options = { html: true, selector: '.cfb-counter' };
      (0, _jquery2.default)('#' + feedback_id).tooltip(options);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var feedback_id = "feedback-" + this.props.data.id;
      var elem = document.getElementById(feedback_id);
      var is_hover = elem && this.is_hover(elem);
      if (elem && !is_hover) {
        (0, _jquery2.default)('#' + feedback_id + ' A[data-toggle="tooltip"]').tooltip('destroy');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var user_name = this._get_username_chunk(); // Plain name or link.
      var right_div = this._get_right_div_chunk(); // Flagging & moderation.
      var comment_body = this.render_comment_body();
      var feedback_btns = this.render_feedback_btns();
      var reply_link = this._get_reply_link_chunk();
      var comment_id = "c" + this.props.data.id;
      var reply_form = this.render_reply_form();

      var new_label = "";
      if (this.props.newcids.indexOf(this.props.data.id) > -1) {
        new_label = _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'span',
            { className: 'label label-success' },
            'new'
          ),
          '\xA0-\xA0'
        );
      }

      var children = "";
      var settings = this.props.settings;
      if (this.props.data.children != null) {
        children = this.props.data.children.map(function (item) {
          return _react2.default.createElement(Comment, { key: item.id,
            data: item,
            settings: settings,
            newcids: this.props.newcids,
            on_comment_created: this.props.on_comment_created });
        }.bind(this));
      }

      return _react2.default.createElement(
        'div',
        { className: 'media', id: comment_id },
        _react2.default.createElement(
          'div',
          { className: 'media-left' },
          _react2.default.createElement('img', { src: this.props.data.user_avatar, height: '48', width: '48' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'media-body' },
          _react2.default.createElement(
            'div',
            { className: 'comment' },
            _react2.default.createElement(
              'h6',
              { className: 'media-heading' },
              new_label,
              this.props.data.submit_date,
              ' - ',
              user_name,
              '\xA0\xA0',
              _react2.default.createElement(
                'a',
                { className: 'permalink', href: this.props.data.permalink },
                '\xB6'
              ),
              right_div
            ),
            _react2.default.createElement('a', { name: comment_id }),
            comment_body,
            feedback_btns,
            reply_link,
            reply_form
          ),
          children
        )
      );
    }
  }]);

  return Comment;
}(_react2.default.Component);

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _commentbox = __webpack_require__(98);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_commentbox.CommentBox, Object.assign(window.comments_props, window.comments_props_override)), document.getElementById('comments'));

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports = django;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(37);

var _jquery2 = _interopRequireDefault(_jquery);

var _django = __webpack_require__(58);

var _django2 = _interopRequireDefault(_django);

var _md = __webpack_require__(59);

var _md2 = _interopRequireDefault(_md);

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _remarkable = __webpack_require__(38);

var _remarkable2 = _interopRequireDefault(_remarkable);

var _lib = __webpack_require__(61);

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentForm = exports.CommentForm = function (_React$Component) {
  _inherits(CommentForm, _React$Component);

  function CommentForm(props) {
    _classCallCheck(this, CommentForm);

    var _this = _possibleConstructorReturn(this, (CommentForm.__proto__ || Object.getPrototypeOf(CommentForm)).call(this, props));

    _this.state = {
      name: '', email: '', url: '', followup: false, comment: '',
      reply_to: _this.props.reply_to || 0,
      visited: { name: false, email: false, comment: false },
      errors: { name: false, email: false, comment: false },
      previewing: false,
      alert: { message: '', cssc: '' }
    };
    _this.handle_input_change = _this.handle_input_change.bind(_this);
    _this.handle_blur = _this.handle_blur.bind(_this);
    _this.handle_submit = _this.handle_submit.bind(_this);
    _this.handle_preview = _this.handle_preview.bind(_this);
    _this.reset_form = _this.reset_form.bind(_this);
    _this.fhelp = _react2.default.createElement(
      'span',
      { className: 'help-block' },
      'This field is required.'
    );
    return _this;
  }

  _createClass(CommentForm, [{
    key: 'handle_input_change',
    value: function handle_input_change(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var iname = target.name;

      this.setState(_defineProperty({}, iname, value));
    }
  }, {
    key: 'handle_blur',
    value: function handle_blur(field) {
      function handler(event) {
        var visited = this.state.visited;
        visited[field] = true;
        this.setState({ visited: visited });
      };
      return handler.bind(this);
    }
  }, {
    key: 'validate',
    value: function validate() {
      var errors = this.state.errors;

      if (!this.state.comment.length) errors.comment = true;else errors.comment = false;
      if (!this.props.is_authenticated) {
        if (!this.state.name.length) errors.name = true;else errors.name = false;
        if (/\S+@\S+\.\S+/.test(this.state.email)) errors.email = false;else errors.email = true;
      } else {
        errors.name = false;
        errors.email = false;
      }
      this.setState({ errors: errors });

      if (this.state.errors.comment || this.state.errors.name || this.state.errors.email) return false;else return true;
    }
  }, {
    key: 'render_field_comment',
    value: function render_field_comment() {
      var cssc = "form-group ",
          help = "";
      if (this.state.errors.comment) {
        cssc += this.state.errors.comment ? "has-error" : "";
        help = this.fhelp;
      }
      var placeholder = _django2.default.gettext("Your comment");
      return _react2.default.createElement(
        'div',
        { className: cssc },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10' },
          _react2.default.createElement('textarea', { required: true, name: 'comment', id: 'id_comment',
            placeholder: placeholder, maxLength: '3000',
            className: 'form-control', value: this.state.comment,
            onChange: this.handle_input_change,
            onBlur: this.handle_blur('comment') }),
          help
        )
      );
    }
  }, {
    key: 'render_field_name',
    value: function render_field_name() {
      if (this.props.is_authenticated) return "";
      var div_cssc = "form-group",
          input_cssc = "form-control",
          help = "";
      if (this.state.reply_to > 0) {
        div_cssc += " form-group-sm";
        input_cssc += " input-sm";
      }
      if (this.state.errors.name) {
        div_cssc += " has-error";
        help = this.fhelp;
      }
      var placeholder = _django2.default.gettext('name');
      return _react2.default.createElement(
        'div',
        { className: div_cssc },
        _react2.default.createElement(
          'label',
          { htmlFor: 'id_name', className: 'control-label col-lg-3 col-md-3' },
          'Name'
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-lg-7 col-md-7' },
          _react2.default.createElement('input', { type: 'text', name: 'name', required: true, id: 'id_name',
            value: this.state.name, placeholder: placeholder,
            onChange: this.handle_input_change,
            onBlur: this.handle_blur('name'),
            className: input_cssc }),
          help
        )
      );
    }
  }, {
    key: 'render_field_email',
    value: function render_field_email() {
      if (this.props.is_authenticated) return "";
      var div_cssc = "form-group",
          input_cssc = "form-control";
      if (this.state.reply_to > 0) {
        div_cssc += " form-group-sm";
        input_cssc += " input-sm";
      }
      if (this.state.errors.email) div_cssc += " has-error";
      var placeholder = _django2.default.gettext('mail address');
      var helptext = _django2.default.gettext('Required for comment verification.');
      return _react2.default.createElement(
        'div',
        { className: div_cssc },
        _react2.default.createElement(
          'label',
          { htmlFor: 'id_email', className: 'control-label col-lg-3 col-md-3' },
          'Mail'
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-lg-7 col-md-7' },
          _react2.default.createElement('input', { type: 'text', name: 'email', required: true, id: 'id_email',
            value: this.state.email, placeholder: placeholder,
            onChange: this.handle_input_change,
            onBlur: this.handle_blur('email'),
            className: input_cssc }),
          _react2.default.createElement(
            'span',
            { className: 'help-block' },
            helptext
          )
        )
      );
    }
  }, {
    key: 'render_field_url',
    value: function render_field_url() {
      if (this.props.is_authenticated) return "";
      var div_cssc = "form-group",
          input_cssc = "form-control";
      if (this.state.reply_to > 0) {
        div_cssc += " form-group-sm";
        input_cssc += " input-sm";
      }
      if (this.state.errors.url) div_cssc += " form-group";
      var placeholder = _django2.default.gettext("url your name links to (optional)");
      return _react2.default.createElement(
        'div',
        { className: div_cssc },
        _react2.default.createElement(
          'label',
          { htmlFor: 'id_url', className: 'control-label col-lg-3 col-md-3' },
          'Link'
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-lg-7 col-md-7' },
          _react2.default.createElement('input', { type: 'text', name: 'url', id: 'id_url', value: this.state.url,
            placeholder: placeholder,
            onChange: this.handle_input_change,
            className: input_cssc })
        )
      );
    }
  }, {
    key: 'render_field_followup',
    value: function render_field_followup() {
      var div_cssc = "checkbox";
      if (this.state.reply_to > 0) div_cssc += " small";
      var label = _django2.default.gettext("Notify me about follow-up comments");
      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-offset-3 col-md-offset-3 col-lg-7 col-md-7' },
          _react2.default.createElement(
            'div',
            { className: div_cssc },
            _react2.default.createElement(
              'label',
              { htmlFor: 'id_followup' },
              _react2.default.createElement('input', { type: 'checkbox', checked: this.state.followup,
                onChange: this.handle_input_change,
                name: 'followup', id: 'id_followup' }),
              '\xA0',
              label
            )
          )
        )
      );
    }
  }, {
    key: 'reset_form',
    value: function reset_form() {
      this.setState({
        name: '', email: '', url: '', followup: false, comment: '',
        visited: { name: false, email: false, comment: false },
        errors: { name: false, email: false, comment: false }
      });
    }
  }, {
    key: 'handle_submit',
    value: function handle_submit(event) {
      event.preventDefault();
      if (!this.validate()) return;

      var data = {
        content_type: this.props.form.content_type,
        object_pk: this.props.form.object_pk,
        timestamp: this.props.form.timestamp,
        security_hash: this.props.form.security_hash,
        honeypot: '',
        comment: this.state.comment,
        name: this.state.name,
        email: this.state.email,
        url: this.state.url,
        followup: this.state.followup,
        reply_to: this.state.reply_to
      };
      var cssc = "alert alert-";
      var msg_202 = _django2.default.gettext("Your comment will be reviewed. Thank your for your patience.");
      var msg_204 = _django2.default.gettext("Thank you, a comment confirmation request has been sent by mail.");
      var msg_403 = _django2.default.gettext("Sorry, your comment has been rejected.");
      var message = {
        202: msg_202,
        204: msg_204,
        403: msg_403
      };

      _jquery2.default.ajax({
        method: 'POST',
        url: this.props.send_url,
        data: data,
        dataType: 'json',
        cache: false,
        success: function (data, textStatus, xhr) {
          if ([201, 202, 204, 403].indexOf(xhr.status) > -1) {
            var css_class = "";
            if (xhr.status == 403) css_class = cssc + "danger";else css_class = cssc + "info";
            this.setState({ alert: { message: message[xhr.status],
                cssc: css_class },
              previewing: false });
            this.reset_form();
            this.props.on_comment_created();
          }
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.send_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: 'handle_preview',
    value: function handle_preview(event) {
      event.preventDefault();
      if (this.validate()) this.setState({ previewing: true });
    }
  }, {
    key: 'rawMarkup',
    value: function rawMarkup() {
      var md = new _remarkable2.default();
      var rawMarkup = md.render(this.state.comment);
      return { __html: rawMarkup };
    }
  }, {
    key: 'render_preview',
    value: function render_preview() {
      if (!this.state.previewing) return "";
      var media_left = "",
          heading_name = "";

      // Build Gravatar.
      var hash = (0, _md2.default)(this.state.email.toLowerCase());
      var avatar_url = "http://www.gravatar.com/avatar/" + hash + "?s=48&d=mm";
      var avatar_img = _react2.default.createElement('img', { src: avatar_url, height: '48', width: '48' });

      if (this.state.url) {
        media_left = _react2.default.createElement(
          'a',
          { href: this.state.url },
          avatar_img
        );
        heading_name = _react2.default.createElement(
          'a',
          { href: this.state.url, target: '_new' },
          this.state.name
        );
      } else {
        media_left = avatar_img;
        if (this.props.is_authenticated) heading_name = this.props.current_user.split(":")[1];else heading_name = this.state.name;
      }

      var div_cssc = "",
          div_style = {},
          hr_line = _react2.default.createElement('hr', null);
      var label = "";
      var header_text = _django2.default.gettext("Your comment in preview");
      var header = _react2.default.createElement(
        'h5',
        { className: 'text-center' },
        header_text
      );
      if (this.state.reply_to > 0) {
        div_cssc = "well well-sm";
        div_style = { marginTop: "1em" };
        header = "";
        label = _react2.default.createElement(
          'div',
          { className: 'label label-info' },
          'preview'
        );
        hr_line = "";
      }
      var nowtext = _django2.default.gettext("Now");
      return _react2.default.createElement(
        'div',
        { className: div_cssc, style: div_style },
        header,
        _react2.default.createElement(
          'div',
          { className: 'media' },
          _react2.default.createElement(
            'div',
            { className: 'media-left' },
            media_left
          ),
          _react2.default.createElement(
            'div',
            { className: 'media-body' },
            _react2.default.createElement(
              'h6',
              { className: 'media-heading' },
              nowtext,
              '\xA0-\xA0',
              heading_name,
              '\xA0\xA0',
              label
            ),
            _react2.default.createElement('div', { className: 'preview',
              dangerouslySetInnerHTML: this.rawMarkup() })
          )
        ),
        hr_line
      );
    }
  }, {
    key: 'render_form',
    value: function render_form() {
      var comment = this.render_field_comment();
      var name = this.render_field_name();
      var mail = this.render_field_email();
      var url = this.render_field_url();
      var followup = this.render_field_followup();
      var btn_submit_class = "btn btn-primary",
          btn_preview_class = "btn btn-default",
          group_style = {};
      if (this.state.reply_to != 0) {
        btn_submit_class += " btn-sm";
        btn_preview_class += " btn-sm";
        group_style = { marginBottom: "0px" };
      }
      var btn_label_preview = _django2.default.gettext("preview");
      var btn_label_send = _django2.default.gettext("send");

      return _react2.default.createElement(
        'form',
        { method: 'POST', onSubmit: this.handle_submit,
          className: 'form-horizontal' },
        _react2.default.createElement('input', { type: 'hidden', name: 'content_type',
          value: this.props.form.content_type }),
        _react2.default.createElement('input', { type: 'hidden', name: 'object_pk',
          value: this.props.form.object_pk }),
        _react2.default.createElement('input', { type: 'hidden', name: 'timestamp',
          value: this.props.form.timestamp }),
        _react2.default.createElement('input', { type: 'hidden', name: 'security_hash',
          value: this.props.form.security_hash }),
        _react2.default.createElement('input', { type: 'hidden', name: 'reply_to',
          value: this.state.reply_to }),
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            'div',
            { style: { display: 'none' } },
            _react2.default.createElement('input', { type: 'text', name: 'honeypot', value: '' })
          ),
          comment,
          ' ',
          name,
          ' ',
          mail,
          ' ',
          url,
          ' ',
          followup
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group', style: group_style },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-offset-3 col-md-offset-3 col-lg-7 col-md-7' },
            _react2.default.createElement('input', { type: 'submit', name: 'post', value: btn_label_send,
              className: btn_submit_class }),
            '\xA0',
            _react2.default.createElement('input', { type: 'button', name: 'preview', value: btn_label_preview,
              className: btn_preview_class,
              onClick: this.handle_preview })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var preview = this.render_preview();
      var header = "";
      var div_class = "well well-sm";
      var label = _django2.default.gettext("Post your comment");
      if (this.state.reply_to == 0) {
        header = _react2.default.createElement(
          'h4',
          { className: 'text-center' },
          label
        );
        div_class = "well well-lg";
      }
      var alert_div = "";
      if (this.state.alert.message) {
        alert_div = _react2.default.createElement(
          'div',
          { className: this.state.alert.cssc },
          this.state.alert.message
        );
      }
      var form = this.render_form();

      return _react2.default.createElement(
        'div',
        { className: 'comment' },
        preview,
        header,
        alert_div,
        _react2.default.createElement(
          'div',
          { className: div_class },
          form
        )
      );
    }
  }]);

  return CommentForm;
}(_react2.default.Component);

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
exports.csrfSafeMethod = csrfSafeMethod;
exports.jquery_ajax_setup = jquery_ajax_setup;

var _jquery = __webpack_require__(37);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
  );
}

function jquery_ajax_setup(csrf_cookie_name) {
  _jquery2.default.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", getCookie(csrf_cookie_name));
      }
    }
  });
}

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(37);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(19);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lib = __webpack_require__(61);

var lib = _interopRequireWildcard(_lib);

var _django = __webpack_require__(58);

var _django2 = _interopRequireDefault(_django);

var _comment = __webpack_require__(100);

var _commentform = __webpack_require__(60);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentBox = exports.CommentBox = function (_React$Component) {
  _inherits(CommentBox, _React$Component);

  function CommentBox(props) {
    _classCallCheck(this, CommentBox);

    var _this = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this, props));

    lib.jquery_ajax_setup('csrftoken');
    _this.state = {
      previewing: false,
      preview: { name: '', email: '', url: '', comment: '' },
      tree: [], cids: [], newcids: [], counter: _this.props.comment_count
    };
    _this.handle_comment_created = _this.handle_comment_created.bind(_this);
    _this.handle_preview = _this.handle_preview.bind(_this);
    _this.handle_update = _this.handle_update.bind(_this);
    return _this;
  }

  _createClass(CommentBox, [{
    key: 'handle_comment_created',
    value: function handle_comment_created() {
      this.load_comments();
    }
  }, {
    key: 'handle_preview',
    value: function handle_preview(name, email, url, comment) {
      this.setState({
        preview: { name: name, email: email, url: url, comment: comment },
        previewing: true
      });
    }
  }, {
    key: 'handle_update',
    value: function handle_update(event) {
      event.preventDefault();
      this.load_comments();
    }
  }, {
    key: 'reset_preview',
    value: function reset_preview() {
      this.setState({
        preview: { name: '', email: '', url: '', comment: '' },
        previewing: false
      });
    }
  }, {
    key: 'render_comment_counter',
    value: function render_comment_counter() {
      if (this.state.counter > 0) {
        var fmts = _django2.default.ngettext("One comment.", "%s comments.", this.state.cids.length);
        var text = _django2.default.interpolate(fmts, [this.state.cids.length]);
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h5',
            { className: 'text-center' },
            text
          ),
          _react2.default.createElement('hr', null)
        );
      } else return "";
    }
  }, {
    key: 'render_comment_form',
    value: function render_comment_form() {
      if (this.props.allow_comments) {
        return _react2.default.createElement(_commentform.CommentForm, { form: this.props.form,
          send_url: this.props.send_url,
          current_user: this.props.current_user,
          is_authenticated: this.props.is_authenticated,
          on_comment_created: this.handle_comment_created });
      } else {
        return _react2.default.createElement(
          'h5',
          null,
          'Comments are disabled for this article.'
        );
      }
    }
  }, {
    key: 'render_update_alert',
    value: function render_update_alert() {
      var diff = this.state.counter - this.state.cids.length;
      if (diff > 0) {
        var fmts = _django2.default.ngettext("There is a new comment.", "There are %s new comments.", diff);
        var message = _django2.default.interpolate(fmts, [diff]);
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-info' },
          message,
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-default btn-xs',
                onClick: this.handle_update },
              'update'
            )
          )
        );
      } else return "";
    }
  }, {
    key: 'create_tree',
    value: function create_tree(data) {
      var tree = new Array();
      var order = new Array();
      var comments = {};
      var children = {};
      var incids = [],
          curcids = [],
          newcids = [];

      function get_children(cid) {
        return children[cid].map(function (index) {
          if (comments[index].children == undefined) {
            comments[index].children = get_children(index);
          }
          return comments[index];
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          incids.push(item.id);
          comments[item.id] = item;
          if (item.level == 0) {
            order.push(item.id);
          }
          children[item.id] = [];
          if (item.parent_id !== item.id) {
            children[item.parent_id].push(item.id);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = order[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _id = _step2.value;

          comments[_id].children = get_children(_id);
          tree.push(comments[_id]);
        }

        // Update attributes curcids and newcids.
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (incids.length) {
        if (this.state.cids.length) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = incids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var id = _step3.value;

              if (this.state.cids.indexOf(id) == -1) newcids.push(id);
              curcids.push(id);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else {
          curcids = incids;
          newcids = [];
        }
      }

      this.setState({ tree: tree,
        cids: curcids,
        newcids: newcids,
        counter: curcids.length });
    }
  }, {
    key: 'load_comments',
    value: function load_comments() {
      _jquery2.default.ajax({
        url: this.props.list_url,
        dataType: 'json',
        cache: false,
        success: function (data) {
          // Set here a cookie with the last time comments have been retrieved.
          // I'll use it to add a label 'new' to every new comment received
          // after the timestamp stored in the cookie.
          this.create_tree(data);
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.list_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: 'load_count',
    value: function load_count() {
      _jquery2.default.ajax({
        url: this.props.count_url,
        dataType: 'json',
        cache: false,
        success: function (data) {
          this.setState({ counter: data.count });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.count_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.load_comments();
      if (this.props.polling_interval) setInterval(this.load_count.bind(this), this.props.polling_interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var settings = this.props;
      var comment_counter = this.render_comment_counter();
      var update_alert = this.render_update_alert();
      var comment_form = this.render_comment_form();

      var nodes = this.state.tree.map(function (item) {
        return _react2.default.createElement(_comment.Comment, { key: item.id,
          data: item,
          settings: settings,
          newcids: this.state.newcids,
          on_comment_created: this.handle_comment_created });
      }.bind(this));

      return _react2.default.createElement(
        'div',
        null,
        comment_counter,
        comment_form,
        _react2.default.createElement('hr', null),
        update_alert,
        _react2.default.createElement(
          'div',
          { className: 'comment-tree' },
          _react2.default.createElement(
            'div',
            { className: 'media-list' },
            nodes
          )
        )
      );
    }
  }]);

  return CommentBox;
}(_react2.default.Component);

/***/ })

},[101]);