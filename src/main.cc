#include "bulk.hh"
#include "chip.hh"
#include "line.hh"
#include "misc.hh"

NAN_MODULE_INIT(InitAll) {
  // misc functions
  Nan::SetMethod(target, "version", version);
  Nan::SetMethod(target, "getChipNames", getChipNames);

  Nan::SetMethod(target, "getInstantLineValue", getInstantLineValue);
  Nan::SetMethod(target, "setInstantLineValue", setInstantLineValue);

  Nan::SetMethod(target, "getInstantLineValues", getInstantLineValues);
  Nan::SetMethod(target, "setInstantLineValues", setInstantLineValues);

#if GPIOD_VERSION_MAJOR == 1 && GPIOD_VERSION_MINOR >= 5

  Nan::SetMethod(target, "getInstantLineValueFlags", getInstantLineValueFlags);
  Nan::SetMethod(target, "setInstantLineValueFlags", setInstantLineValueFlags);

  Nan::SetMethod(target, "getInstantLineValuesFlags", getInstantLineValuesFlags);
  Nan::SetMethod(target, "setInstantLineValuesFlags", setInstantLineValuesFlags);

#endif

  Nan::SetMethod(target, "instantMonitorEvent", instantMonitorEvent);
  Nan::SetMethod(target, "instantMonitorEventFlags", instantMonitorEventFlags);

  Nan::SetMethod(target, "instantMonitorEvents", instantMonitorEvent);
  Nan::SetMethod(target, "instantMonitorEventsFlags", instantMonitorEventFlags);

  Chip::Init(target);
  Nan::SetMethod(target, "getChipName", getChipName);
  Nan::SetMethod(target, "getChipLabel", getChipLabel);
  Nan::SetMethod(target, "getNumberOfLines", getNumberOfLines);
  Nan::SetMethod(target, "getLineNames", getLineNames);

  Line::Init(target);
  Nan::SetMethod(target, "getLineOffset", getLineOffset);
  Nan::SetMethod(target, "getLineName", getLineName);
  Nan::SetMethod(target, "getLineConsumer", getLineConsumer);
  Nan::SetMethod(target, "getLineDirection", getLineDirection);
  Nan::SetMethod(target, "getLineActiveState", getLineActiveState);

#if GPIOD_VERSION_MAJOR == 1 && GPIOD_VERSION_MINOR >= 5

  Nan::SetMethod(target, "getLineBias", getLineBias);

#endif

  Nan::SetMethod(target, "isLineUsed", isLineUsed);
  Nan::SetMethod(target, "isLineFree", isLineFree);
  Nan::SetMethod(target, "isLineOpenDrain", isLineOpenDrain);
  Nan::SetMethod(target, "isLineOpenSource", isLineOpenSource);
  Nan::SetMethod(target, "update", update);
  Nan::SetMethod(target, "needsUpdate", needsUpdate);

  Nan::SetMethod(target, "getValue", getValue);
  Nan::SetMethod(target, "setValue", setValue);

  Nan::SetMethod(target, "lineRequest", lineRequest);

  Nan::SetMethod(target, "requestInputMode", requestInputMode);
  Nan::SetMethod(target, "requestOutputMode", requestOutputMode);
  Nan::SetMethod(target, "requestRisingEdgeEvents", requestRisingEdgeEvents);
  Nan::SetMethod(target, "requestFallingEdgeEvents", requestFallingEdgeEvents);
  Nan::SetMethod(target, "requestBothEdgesEvents", requestBothEdgesEvents);

  Nan::SetMethod(target, "requestInputModeFlags", requestInputModeFlags);
  Nan::SetMethod(target, "requestOutputModeFlags", requestOutputModeFlags);
  Nan::SetMethod(target, "requestRisingEdgeEventFlags", requestRisingEdgeEventFlags);
  Nan::SetMethod(target, "requestFallingEdgeEventFlags", requestFallingEdgeEventFlags);
  Nan::SetMethod(target, "requestBothEdgesEventFlags", requestBothEdgesEventFlags);

  Nan::SetMethod(target, "release", release);

  Bulk::Init(target);
  Nan::SetMethod(target, "getValues", getValues);
  Nan::SetMethod(target, "setValues", setValues);

  Nan::SetMethod(target, "requestBulkInputMode", requestBulkInputMode);
  Nan::SetMethod(target, "requestBulkOutputMode", requestBulkOutputMode);

  Nan::SetMethod(target, "requestBulkRisingEdgeEvents", requestBulkRisingEdgeEvents);
  Nan::SetMethod(target, "requestBulkFallingEdgeEvents", requestBulkFallingEdgeEvents);
  Nan::SetMethod(target, "requestBulkBothEdgesEvents", requestBulkBothEdgesEvents);

#if GPIOD_VERSION_MAJOR == 1 && GPIOD_VERSION_MINOR >= 5

  Nan::SetMethod(target, "requestBulkDirectionInput", requestBulkDirectionInput);
  Nan::SetMethod(target, "requestBulkDirectionOutput", requestBulkDirectionOutput);

  Nan::SetMethod(target, "requestBulk", requestBulk);
  Nan::SetMethod(target, "setConfigBulk", setConfigBulk);

  Nan::SetMethod(target, "setFlagsBulk", setFlagsBulk);

#endif

  Nan::SetMethod(target, "requestBulkInputFlags", requestBulkInputFlags);
  Nan::SetMethod(target, "requestBulkOutputFlags", requestBulkOutputFlags);
  Nan::SetMethod(target, "requestBulkRisingEdgeEventsFlags", requestBulkRisingEdgeEventsFlags);
  Nan::SetMethod(target, "requestBulkFallingEdgeEventsFlags", requestBulkFallingEdgeEventsFlags);
  Nan::SetMethod(target, "requestBulkBothEdgesEventsFlags", requestBulkBothEdgesEventsFlags);

  Nan::SetMethod(target, "releaseBulk", releaseBulk);
}

NODE_MODULE(NativeExtension, InitAll);
