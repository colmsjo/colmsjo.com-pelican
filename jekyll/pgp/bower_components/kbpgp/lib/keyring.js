// Generated by IcedCoffeeScript 1.7.1-c
(function() {
  var KeyFetcher, PgpKeyRing, hexkid,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KeyFetcher = require('./keyfetch').KeyFetcher;

  hexkid = function(k) {
    return k.toString('hex');
  };

  PgpKeyRing = (function(_super) {
    __extends(PgpKeyRing, _super);

    function PgpKeyRing() {
      this._keys = {};
      this._kms = {};
    }

    PgpKeyRing.prototype.add_key_manager = function(km) {
      var k, keys, kid, _i, _len, _results;
      keys = km.export_pgp_keys_to_keyring();
      _results = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        k = keys[_i];
        kid = hexkid(k.key_material.get_key_id());
        this._keys[kid] = k;
        _results.push(this._kms[kid] = km);
      }
      return _results;
    };

    PgpKeyRing.prototype.fetch = function(key_ids, ops, cb) {
      var err, i, id, k, key_material, km, obj, ret_i, _i, _len, _ref;
      key_material = err = obj = null;
      key_ids = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = key_ids.length; _i < _len; _i++) {
          k = key_ids[_i];
          _results.push(hexkid(k));
        }
        return _results;
      })();
      km = null;
      for (i = _i = 0, _len = key_ids.length; _i < _len; i = ++_i) {
        id = key_ids[i];
        k = this._keys[id];
        if (k != null ? (_ref = k.key) != null ? _ref.can_perform(ops) : void 0 : void 0) {
          ret_i = i;
          km = this._kms[id];
          break;
        }
      }
      if (km == null) {
        err = new Error("key not found: " + (JSON.stringify(key_ids)));
      }
      return cb(err, km, ret_i);
    };

    PgpKeyRing.prototype.find_best_key = function(_arg, cb) {
      var err, flags, key, key_id, kid, km;
      key_id = _arg.key_id, flags = _arg.flags;
      if ((km = this._kms[(kid = hexkid(key_id))]) == null) {
        err = new Error("Could not find key for fingerprint " + kid);
      } else if ((key = km.find_best_pgp_key(flags)) == null) {
        err = new Error("no matching key for flags: " + flags);
      }
      return cb(err, key);
    };

    PgpKeyRing.prototype.lookup = function(key_id) {
      return this._keys[hexkid(key_id)];
    };

    return PgpKeyRing;

  })(KeyFetcher);

  exports.PgpKeyRing = PgpKeyRing;

  exports.KeyRing = PgpKeyRing;

}).call(this);