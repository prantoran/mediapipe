

```bash
export GLOG_logtostderr=1

bazel run --copt -DMESA_EGL_NO_X11_HEADERS --copt -DEGL_NO_X11 \
    mediapipe/examples/desktop/hello_world:hello_world
```

## Running face mesh example GPU
```bash
bazel build -c opt --copt -DMESA_EGL_NO_X11_HEADERS --copt -DEGL_NO_X11 \
  mediapipe/examples/desktop/face_mesh:face_mesh_gpu

export GLOG_logtostderr=1
bazel-bin/mediapipe/examples/desktop/face_mesh/face_mesh_gpu \
  --calculator_graph_config_file=mediapipe/graphs/face_mesh/face_mesh_desktop_live_gpu.pbtxt
```

## Running selfie segmentation example GPU
```bash
bazel build -c opt --copt -DMESA_EGL_NO_X11_HEADERS --copt -DEGL_NO_X11 \
  mediapipe/examples/desktop/selfie_segmentation:selfie_segmentation_gpu

export GLOG_logtostderr=1
bazel-bin/mediapipe/examples/desktop/selfie_segmentation/selfie_segmentation_gpu \
  --calculator_graph_config_file=mediapipe/graphs/selfie_segmentation/selfie_segmentation_gpu.pbtxt
```

## Selfie segmentation
```bash
bazel build -c opt --copt -DMESA_EGL_NO_X11_HEADERS --copt -DEGL_NO_X11 \
  src/selfie_segmentation:main

export GLOG_logtostderr=1
bazel-bin/src/selfie_segmentation/main \
  --calculator_graph_config_file=mediapipe/graphs/selfie_segmentation/selfie_segmentation_gpu.pbtxt
```


## Post-processing
- Joint Bilateral Filtering
- Light Wrapping
- Separable filter (instead of Gaussian pyramid)

## Appendix
WASM ticket: https://github.com/google/mediapipe/issues/877

Model cards
- Meet Segmentation: https://drive.google.com/file/d/1lnP1bRi9CSqQQXUHa13159vLELYDgDu0/preview
    - Input(s)
      - A frame of video or an image, represented as a 256 x 144 x 3 tensor (for the full model), or 160 x 96 x 3 tensor (for the light model). Channels order: RGB with values in [0.0, 1.0].
    - Output(s)
      - 256 x 144 x 2 tensor for the full model or 160 x 96 x 2 tensor for the light model with masks for background (channel 0) and person (channel 1) where values are in range [MIN_FLOAT, MAX_FLOAT] and user has to apply softmax across both channels to yield foreground probability in [0.0, 1.0].


Segmentation-mask smoothing:
- https://github.com/google/mediapipe/issues/4058
- https://github.com/google/mediapipe/issues/4919
- https://github.com/google/mediapipe/issues/1408

### Blogs
- https://dannadori.medium.com/google-meet-virtual-background-with-amazon-chime-sdk-34656a625fed
- https://blog.research.google/2020/10/background-features-in-google-meet.html
- Converting tflite weights to tensorflowjs: https://zenn.dev/pinto0309/articles/9d316860f8d418
- TFLite, MP, Wasm: https://dannadori.medium.com/build-tflite-wasm-simd-and-run-google-meet-virtual-background-6090226ed465

### Interesting repos
- https://github.com/spite/FaceMeshFaceGeometry


### TS definition files of the npm packages
- https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/pose/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/hands/index.d.ts
- https://cdn.jsdelivr.net/npm/@mediapipe/holistic/index.d.ts

### MP Helper libs
- @mediapipe/drawing_utils
- @mediapipe/camera_utils
- @mediapipe/control_utils

### Docs
- WASM
  - https://developer.mozilla.org/en-US/docs/WebAssembly
- WebGL
  - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
- Squeeze-and-Excitation Networks
  - https://github.com/hujie-frank/SENet
- MobileNetV3
  - https://blog.research.google/2019/11/introducing-next-generation-on-device.html
- Neural architecture search
  - https://en.wikipedia.org/wiki/Neural_architecture_search
- Bilateral filter
  - https://en.wikipedia.org/wiki/Bilateral_filter
- TFJS
  - https://www.tensorflow.org/js/tutorials

drawConnectors() ?

### Uncategorized
- https://feitongt.github.io/HumanGPS
- https://blog.tensorflow.org/
- https://web.dev/articles/coop-coep
- https://medium.com/htc-research-engineering-blog