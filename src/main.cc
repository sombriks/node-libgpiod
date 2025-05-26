#include "bulk.hh"
#include "chip.hh"
#include "line.hh"
#include "misc.hh"

NAN_MODULE_INIT(InitAll) {
  // misc functions
  Nan::Set(target, Nan::New("version").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(version)).ToLocalChecked());
  Nan::Set(target, Nan::New("getInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getInstantLineValue)).ToLocalChecked());
  Nan::Set(target, Nan::New("setInstantLineValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(setInstantLineValue)).ToLocalChecked());

  Chip::Init(target);
  Nan::Set(target, Nan::New("getChipName").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getChipName)).ToLocalChecked());
  Nan::Set(target, Nan::New("getChipLabel").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getChipLabel)).ToLocalChecked());
  Nan::Set(target, Nan::New("getNumberOfLines").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getNumberOfLines)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineNames").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineNames)).ToLocalChecked());

  Line::Init(target);
  Nan::Set(target, Nan::New("getLineOffset").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineOffset)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineName").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineName)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineConsumer").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineConsumer)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineDirection").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineDirection)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineActiveState").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineActiveState)).ToLocalChecked());
  Nan::Set(target, Nan::New("getLineBias").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLineBias)).ToLocalChecked());
  Nan::Set(target, Nan::New("isLineUsed").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(isLineUsed)).ToLocalChecked());
  Nan::Set(target, Nan::New("isLineFree").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(isLineFree)).ToLocalChecked());
  Nan::Set(target, Nan::New("isLineOpenDrain").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(isLineOpenDrain)).ToLocalChecked());
  Nan::Set(target, Nan::New("isLineOpenSource").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(isLineOpenSource)).ToLocalChecked());
  Nan::Set(target, Nan::New("update").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(update)).ToLocalChecked());
  Nan::Set(target, Nan::New("needsUpdate").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(needsUpdate)).ToLocalChecked());

  Nan::Set(target, Nan::New("getValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getValue)).ToLocalChecked());
  Nan::Set(target, Nan::New("setValue").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(setValue)).ToLocalChecked());

  Nan::Set(target, Nan::New("lineRequest").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(lineRequest)).ToLocalChecked());

  Nan::Set(target, Nan::New("requestInputMode").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestInputMode)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestOutputMode").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestOutputMode)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestRisingEdgeEvents").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestRisingEdgeEvents)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestFallingEdgeEvents").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestFallingEdgeEvents)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestBothEdgesEvents").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestBothEdgesEvents)).ToLocalChecked());

  Nan::Set(target, Nan::New("requestInputModeFlags").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestInputModeFlags)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestOutputModeFlags").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestOutputModeFlags)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestRisingEdgeEventFlags").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestRisingEdgeEventFlags)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestFallingEdgeEventFlags").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestFallingEdgeEventFlags)).ToLocalChecked());
  Nan::Set(target, Nan::New("requestBothEdgesEventFlags").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(requestBothEdgesEventFlags)).ToLocalChecked());

  Nan::Set(target, Nan::New("release").ToLocalChecked(),
           Nan::GetFunction(Nan::New<v8::FunctionTemplate>(release)).ToLocalChecked());
}

NODE_MODULE(NativeExtension, InitAll);
