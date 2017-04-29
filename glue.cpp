
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM_INT({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// PointCloud

draco::PointCloud* EMSCRIPTEN_KEEPALIVE emscripten_bind_PointCloud_PointCloud_0() {
  return new draco::PointCloud();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointCloud_num_attributes_0(draco::PointCloud* self) {
  return self->num_attributes();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointCloud_num_points_0(draco::PointCloud* self) {
  return self->num_points();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointCloud___destroy___0(draco::PointCloud* self) {
  delete self;
}

// WebIDLWrapper

draco::WebIDLWrapper* EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_WebIDLWrapper_0() {
  return new draco::WebIDLWrapper();
}

draco_EncodedGeometryType EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_GetEncodedGeometryType_1(draco::WebIDLWrapper* self, draco::DecoderBuffer* arg0) {
  return self->GetEncodedGeometryType(arg0);
}

draco::PointCloud* EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_DecodePointCloudFromBuffer_1(draco::WebIDLWrapper* self, draco::DecoderBuffer* arg0) {
  return self->DecodePointCloudFromBuffer(arg0);
}

draco::Mesh* EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_DecodeMeshFromBuffer_1(draco::WebIDLWrapper* self, draco::DecoderBuffer* arg0) {
  return self->DecodeMeshFromBuffer(arg0);
}

const int EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_GetAttributeId_2(draco::WebIDLWrapper* self, draco::PointCloud* arg0, draco_GeometryAttribute_Type arg1) {
  return self->GetAttributeId(*arg0, arg1);
}

const draco::PointAttribute* EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_GetAttribute_2(draco::WebIDLWrapper* self, draco::PointCloud* arg0, int arg1) {
  return self->GetAttribute(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_GetFaceFromMesh_3(draco::WebIDLWrapper* self, draco::Mesh* arg0, int arg1, draco::DracoInt32Array* arg2) {
  return self->GetFaceFromMesh(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_GetAttributeFloat_3(draco::WebIDLWrapper* self, draco::PointAttribute* arg0, int arg1, draco::DracoFloat32Array* arg2) {
  return self->GetAttributeFloat(*arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper_GetAttributeFloatForAllPoints_3(draco::WebIDLWrapper* self, draco::PointCloud* arg0, draco::PointAttribute* arg1, draco::DracoFloat32Array* arg2) {
  return self->GetAttributeFloatForAllPoints(*arg0, *arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WebIDLWrapper___destroy___0(draco::WebIDLWrapper* self) {
  delete self;
}

// PointAttribute

draco::PointAttribute* EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_PointAttribute_0() {
  return new draco::PointAttribute();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_size_0(draco::PointAttribute* self) {
  return self->size();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_attribute_type_0(draco::PointAttribute* self) {
  return self->attribute_type();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_data_type_0(draco::PointAttribute* self) {
  return self->data_type();
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_components_count_0(draco::PointAttribute* self) {
  return self->components_count();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_normalized_0(draco::PointAttribute* self) {
  return self->normalized();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_byte_stride_0(draco::PointAttribute* self) {
  return self->byte_stride();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_byte_offset_0(draco::PointAttribute* self) {
  return self->byte_offset();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute_custom_id_0(draco::PointAttribute* self) {
  return self->custom_id();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointAttribute___destroy___0(draco::PointAttribute* self) {
  delete self;
}

// DracoFloat32Array

draco::DracoFloat32Array* EMSCRIPTEN_KEEPALIVE emscripten_bind_DracoFloat32Array_DracoFloat32Array_0() {
  return new draco::DracoFloat32Array();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_DracoFloat32Array_GetValue_1(draco::DracoFloat32Array* self, int arg0) {
  return self->GetValue(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DracoFloat32Array___destroy___0(draco::DracoFloat32Array* self) {
  delete self;
}

// GeometryAttribute

draco::GeometryAttribute* EMSCRIPTEN_KEEPALIVE emscripten_bind_GeometryAttribute_GeometryAttribute_0() {
  return new draco::GeometryAttribute();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GeometryAttribute___destroy___0(draco::GeometryAttribute* self) {
  delete self;
}

// DecoderBuffer

draco::DecoderBuffer* EMSCRIPTEN_KEEPALIVE emscripten_bind_DecoderBuffer_DecoderBuffer_0() {
  return new draco::DecoderBuffer();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DecoderBuffer_Init_2(draco::DecoderBuffer* self, char* arg0, unsigned int arg1) {
  self->Init(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DecoderBuffer___destroy___0(draco::DecoderBuffer* self) {
  delete self;
}

// Mesh

draco::Mesh* EMSCRIPTEN_KEEPALIVE emscripten_bind_Mesh_Mesh_0() {
  return new draco::Mesh();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Mesh_num_faces_0(draco::Mesh* self) {
  return self->num_faces();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Mesh_num_attributes_0(draco::Mesh* self) {
  return self->num_attributes();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Mesh_num_points_0(draco::Mesh* self) {
  return self->num_points();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Mesh___destroy___0(draco::Mesh* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// DracoInt32Array

draco::DracoInt32Array* EMSCRIPTEN_KEEPALIVE emscripten_bind_DracoInt32Array_DracoInt32Array_0() {
  return new draco::DracoInt32Array();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_DracoInt32Array_GetValue_1(draco::DracoInt32Array* self, int arg0) {
  return self->GetValue(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DracoInt32Array___destroy___0(draco::DracoInt32Array* self) {
  delete self;
}

// draco_EncodedGeometryType
draco_EncodedGeometryType EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE() {
  return draco::INVALID_GEOMETRY_TYPE;
}
draco_EncodedGeometryType EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD() {
  return draco::POINT_CLOUD;
}
draco_EncodedGeometryType EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH() {
  return draco::TRIANGULAR_MESH;
}

// draco_GeometryAttribute_Type
draco_GeometryAttribute_Type EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_GeometryAttribute_Type_INVALID() {
  return draco_GeometryAttribute::INVALID;
}
draco_GeometryAttribute_Type EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_GeometryAttribute_Type_POSITION() {
  return draco_GeometryAttribute::POSITION;
}
draco_GeometryAttribute_Type EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_GeometryAttribute_Type_NORMAL() {
  return draco_GeometryAttribute::NORMAL;
}
draco_GeometryAttribute_Type EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_GeometryAttribute_Type_COLOR() {
  return draco_GeometryAttribute::COLOR;
}
draco_GeometryAttribute_Type EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD() {
  return draco_GeometryAttribute::TEX_COORD;
}
draco_GeometryAttribute_Type EMSCRIPTEN_KEEPALIVE emscripten_enum_draco_GeometryAttribute_Type_GENERIC() {
  return draco_GeometryAttribute::GENERIC;
}

}

