# WASM Notes



## Converting OpenCV to WASM

```bash
git clone https://github.com/opencv/opencv.git -b 4.8.1 --depth 1
cd opencv/
EMSDK_DIR=${HOME}/work/src/github.com/emscripten-core/emsdk
python3  platforms/js/build_js.py build_wasm \
    --emscripten_dir=${EMSDK_DIR}/upstream/emscripten \
    --config_only
```
- output in logs/opencv-python-wasm-build.txt

```bash
export OPENCV_JS_WHITELIST=${HOME}/work/src/github.com/opencv/opencv/platforms/js/opencv_js.config.py
cd build_wasm && ${EMSDK_DIR}/upstream/emscripten/emmake make -j && ${EMSDK_DIR}/upstream/emscripten/emmake make install
```


Enable experimental WebAssembly features in Chrome:
```bash
chrome://flags/
```

## emsdk/bazel
- https://github.com/emscripten-core/emsdk/tree/master/bazel

## TF
- https://github.com/tensorflow/tensorflow/blob/master/tensorflow/BUILD#L333-L344
- https://github.com/tensorflow/tensorflow/blob/master/tensorflow/BUILD#L909


## TFJS
- https://github.com/tensorflow/tfjs/blob/master/WORKSPACE#L101-L121
- https://github.com/tensorflow/tfjs/blob/master/dockers/wasm-docker/Dockerfile
- https://github.com/tensorflow/tfjs/blob/master/docs/OPTIMIZATION_PURE_GPU_PIPELINE.md
- https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/src/cc/BUILD.bazel
- https://github.com/tensorflow/tfjs/commit/5e99fbdefde33b4df2558972b2d1a9f1525be61c [old]


## -pre.js -post.js linkopts flags
- https://github.com/emscripten-core/emsdk/issues/933
- https://emscripten.org/docs/tools_reference/emcc.html#emcc-pre-js


## Debugging
### undefined symbol: _embind_register_function
- https://github.com/emscripten-core/emscripten/issues/9379


## Emscripten 
### docs
- https://emscripten.org/docs/getting_started/FAQ.html
- https://emscripten.org/docs/api_reference/module.html
### issues
- https://github.com/emscripten-core/emscripten/issues/15730


## Uncategorized
- checkStackCookie, writeStackCookie erros in console when using GL_DEBUG=1