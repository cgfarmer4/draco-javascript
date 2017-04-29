
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },  
  copy: function(array, view, offset) {
    var offsetShifted = offset;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offsetShifted >>= 1; break;
      case 4: offsetShifted >>= 2; break;
      case 8: offsetShifted >>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offsetShifted + i] = array[i];
    }   
  },
};

function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// PointCloud
function PointCloud() {
  this.ptr = _emscripten_bind_PointCloud_PointCloud_0();
  getCache(PointCloud)[this.ptr] = this;
};;
PointCloud.prototype = Object.create(WrapperObject.prototype);
PointCloud.prototype.constructor = PointCloud;
PointCloud.prototype.__class__ = PointCloud;
PointCloud.__cache__ = {};
Module['PointCloud'] = PointCloud;

PointCloud.prototype['num_attributes'] = PointCloud.prototype.num_attributes = function() {
  var self = this.ptr;
  return _emscripten_bind_PointCloud_num_attributes_0(self);
};;

PointCloud.prototype['num_points'] = PointCloud.prototype.num_points = function() {
  var self = this.ptr;
  return _emscripten_bind_PointCloud_num_points_0(self);
};;

  PointCloud.prototype['__destroy__'] = PointCloud.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_PointCloud___destroy___0(self);
};
// WebIDLWrapper
function WebIDLWrapper() {
  this.ptr = _emscripten_bind_WebIDLWrapper_WebIDLWrapper_0();
  getCache(WebIDLWrapper)[this.ptr] = this;
};;
WebIDLWrapper.prototype = Object.create(WrapperObject.prototype);
WebIDLWrapper.prototype.constructor = WebIDLWrapper;
WebIDLWrapper.prototype.__class__ = WebIDLWrapper;
WebIDLWrapper.__cache__ = {};
Module['WebIDLWrapper'] = WebIDLWrapper;

WebIDLWrapper.prototype['GetEncodedGeometryType'] = WebIDLWrapper.prototype.GetEncodedGeometryType = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_WebIDLWrapper_GetEncodedGeometryType_1(self, arg0);
};;

WebIDLWrapper.prototype['DecodePointCloudFromBuffer'] = WebIDLWrapper.prototype.DecodePointCloudFromBuffer = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_WebIDLWrapper_DecodePointCloudFromBuffer_1(self, arg0), PointCloud);
};;

WebIDLWrapper.prototype['DecodeMeshFromBuffer'] = WebIDLWrapper.prototype.DecodeMeshFromBuffer = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_WebIDLWrapper_DecodeMeshFromBuffer_1(self, arg0), Mesh);
};;

WebIDLWrapper.prototype['GetAttributeId'] = WebIDLWrapper.prototype.GetAttributeId = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_WebIDLWrapper_GetAttributeId_2(self, arg0, arg1);
};;

WebIDLWrapper.prototype['GetAttribute'] = WebIDLWrapper.prototype.GetAttribute = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_WebIDLWrapper_GetAttribute_2(self, arg0, arg1), PointAttribute);
};;

WebIDLWrapper.prototype['GetFaceFromMesh'] = WebIDLWrapper.prototype.GetFaceFromMesh = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_WebIDLWrapper_GetFaceFromMesh_3(self, arg0, arg1, arg2));
};;

WebIDLWrapper.prototype['GetAttributeFloat'] = WebIDLWrapper.prototype.GetAttributeFloat = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_WebIDLWrapper_GetAttributeFloat_3(self, arg0, arg1, arg2));
};;

WebIDLWrapper.prototype['GetAttributeFloatForAllPoints'] = WebIDLWrapper.prototype.GetAttributeFloatForAllPoints = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_WebIDLWrapper_GetAttributeFloatForAllPoints_3(self, arg0, arg1, arg2));
};;

  WebIDLWrapper.prototype['__destroy__'] = WebIDLWrapper.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WebIDLWrapper___destroy___0(self);
};
// PointAttribute
function PointAttribute() {
  this.ptr = _emscripten_bind_PointAttribute_PointAttribute_0();
  getCache(PointAttribute)[this.ptr] = this;
};;
PointAttribute.prototype = Object.create(WrapperObject.prototype);
PointAttribute.prototype.constructor = PointAttribute;
PointAttribute.prototype.__class__ = PointAttribute;
PointAttribute.__cache__ = {};
Module['PointAttribute'] = PointAttribute;

PointAttribute.prototype['size'] = PointAttribute.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_size_0(self);
};;

PointAttribute.prototype['attribute_type'] = PointAttribute.prototype.attribute_type = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_attribute_type_0(self);
};;

PointAttribute.prototype['data_type'] = PointAttribute.prototype.data_type = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_data_type_0(self);
};;

PointAttribute.prototype['components_count'] = PointAttribute.prototype.components_count = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_components_count_0(self);
};;

PointAttribute.prototype['normalized'] = PointAttribute.prototype.normalized = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_PointAttribute_normalized_0(self));
};;

PointAttribute.prototype['byte_stride'] = PointAttribute.prototype.byte_stride = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_byte_stride_0(self);
};;

PointAttribute.prototype['byte_offset'] = PointAttribute.prototype.byte_offset = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_byte_offset_0(self);
};;

PointAttribute.prototype['custom_id'] = PointAttribute.prototype.custom_id = function() {
  var self = this.ptr;
  return _emscripten_bind_PointAttribute_custom_id_0(self);
};;

  PointAttribute.prototype['__destroy__'] = PointAttribute.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_PointAttribute___destroy___0(self);
};
// DracoFloat32Array
function DracoFloat32Array() {
  this.ptr = _emscripten_bind_DracoFloat32Array_DracoFloat32Array_0();
  getCache(DracoFloat32Array)[this.ptr] = this;
};;
DracoFloat32Array.prototype = Object.create(WrapperObject.prototype);
DracoFloat32Array.prototype.constructor = DracoFloat32Array;
DracoFloat32Array.prototype.__class__ = DracoFloat32Array;
DracoFloat32Array.__cache__ = {};
Module['DracoFloat32Array'] = DracoFloat32Array;

DracoFloat32Array.prototype['GetValue'] = DracoFloat32Array.prototype.GetValue = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_DracoFloat32Array_GetValue_1(self, arg0);
};;

  DracoFloat32Array.prototype['__destroy__'] = DracoFloat32Array.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_DracoFloat32Array___destroy___0(self);
};
// GeometryAttribute
function GeometryAttribute() {
  this.ptr = _emscripten_bind_GeometryAttribute_GeometryAttribute_0();
  getCache(GeometryAttribute)[this.ptr] = this;
};;
GeometryAttribute.prototype = Object.create(WrapperObject.prototype);
GeometryAttribute.prototype.constructor = GeometryAttribute;
GeometryAttribute.prototype.__class__ = GeometryAttribute;
GeometryAttribute.__cache__ = {};
Module['GeometryAttribute'] = GeometryAttribute;

  GeometryAttribute.prototype['__destroy__'] = GeometryAttribute.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GeometryAttribute___destroy___0(self);
};
// DecoderBuffer
function DecoderBuffer() {
  this.ptr = _emscripten_bind_DecoderBuffer_DecoderBuffer_0();
  getCache(DecoderBuffer)[this.ptr] = this;
};;
DecoderBuffer.prototype = Object.create(WrapperObject.prototype);
DecoderBuffer.prototype.constructor = DecoderBuffer;
DecoderBuffer.prototype.__class__ = DecoderBuffer;
DecoderBuffer.__cache__ = {};
Module['DecoderBuffer'] = DecoderBuffer;

DecoderBuffer.prototype['Init'] = DecoderBuffer.prototype.Init = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof arg0 == 'object') { arg0 = ensureInt8(arg0); }
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_DecoderBuffer_Init_2(self, arg0, arg1);
};;

  DecoderBuffer.prototype['__destroy__'] = DecoderBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_DecoderBuffer___destroy___0(self);
};
// Mesh
function Mesh() {
  this.ptr = _emscripten_bind_Mesh_Mesh_0();
  getCache(Mesh)[this.ptr] = this;
};;
Mesh.prototype = Object.create(WrapperObject.prototype);
Mesh.prototype.constructor = Mesh;
Mesh.prototype.__class__ = Mesh;
Mesh.__cache__ = {};
Module['Mesh'] = Mesh;

Mesh.prototype['num_faces'] = Mesh.prototype.num_faces = function() {
  var self = this.ptr;
  return _emscripten_bind_Mesh_num_faces_0(self);
};;

Mesh.prototype['num_attributes'] = Mesh.prototype.num_attributes = function() {
  var self = this.ptr;
  return _emscripten_bind_Mesh_num_attributes_0(self);
};;

Mesh.prototype['num_points'] = Mesh.prototype.num_points = function() {
  var self = this.ptr;
  return _emscripten_bind_Mesh_num_points_0(self);
};;

  Mesh.prototype['__destroy__'] = Mesh.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Mesh___destroy___0(self);
};
// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// DracoInt32Array
function DracoInt32Array() {
  this.ptr = _emscripten_bind_DracoInt32Array_DracoInt32Array_0();
  getCache(DracoInt32Array)[this.ptr] = this;
};;
DracoInt32Array.prototype = Object.create(WrapperObject.prototype);
DracoInt32Array.prototype.constructor = DracoInt32Array;
DracoInt32Array.prototype.__class__ = DracoInt32Array;
DracoInt32Array.__cache__ = {};
Module['DracoInt32Array'] = DracoInt32Array;

DracoInt32Array.prototype['GetValue'] = DracoInt32Array.prototype.GetValue = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_DracoInt32Array_GetValue_1(self, arg0);
};;

  DracoInt32Array.prototype['__destroy__'] = DracoInt32Array.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_DracoInt32Array___destroy___0(self);
};
(function() {
  function setupEnums() {
    

    // draco_EncodedGeometryType

    Module['INVALID_GEOMETRY_TYPE'] = _emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE();

    Module['POINT_CLOUD'] = _emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD();

    Module['TRIANGULAR_MESH'] = _emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH();

    

    // draco_GeometryAttribute_Type

    Module['INVALID'] = _emscripten_enum_draco_GeometryAttribute_Type_INVALID();

    Module['POSITION'] = _emscripten_enum_draco_GeometryAttribute_Type_POSITION();

    Module['NORMAL'] = _emscripten_enum_draco_GeometryAttribute_Type_NORMAL();

    Module['COLOR'] = _emscripten_enum_draco_GeometryAttribute_Type_COLOR();

    Module['TEX_COORD'] = _emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD();

    Module['GENERIC'] = _emscripten_enum_draco_GeometryAttribute_Type_GENERIC();

  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
