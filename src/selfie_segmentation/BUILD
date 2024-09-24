licenses(["notice"])  # Apache 2.0

package(default_visibility = [
    "//visibility:public",
])


load("@emsdk//emscripten_toolchain:wasm_rules.bzl", "wasm_cc_binary")


OPENCV_DEPS = [
    "//mediapipe/framework/formats:image_frame_opencv",
    "//mediapipe/framework/port:opencv_imgproc",
    "//mediapipe/framework/port:opencv_core",
    "//mediapipe/framework/port:opencv_highgui",
    "//mediapipe/framework/port:opencv_video",
]

MAIN_GPU_DEPS = [
    "//mediapipe/framework:calculator_framework",
    "//mediapipe/framework/formats:image_frame",
    "//mediapipe/framework/port:file_helpers",
    "//mediapipe/framework/port:parse_text_proto",
    "//mediapipe/framework/port:status",
    "//mediapipe/gpu:gl_calculator_helper",
    "//mediapipe/gpu:gpu_buffer",
    "//mediapipe/gpu:gpu_shared_data_internal",
    "//mediapipe/util:resource_util",
    "@com_google_absl//absl/flags:flag",
    "@com_google_absl//absl/flags:parse",
    "@com_google_absl//absl/log:absl_log",
    "//mediapipe/framework/formats:landmark_cc_proto",
    "//mediapipe/framework/formats:classification_cc_proto",
    "//mediapipe/framework/formats:detection_cc_proto",
    "//mediapipe/framework/formats:location_data_cc_proto",
]

SELFIE_SEGMENTATION_DEPS = [
    "//mediapipe/graphs/selfie_segmentation:selfie_segmentation_gpu_deps",
    "//mediapipe/calculators/image:bilateral_filter_calculator",
    "//mediapipe/calculators/image:mask_overlay_calculator",
    "//mediapipe/calculators/core:previous_loopback_calculator",
    "//mediapipe/calculators/image:segmentation_smoothing_calculator",
    "//mediapipe/calculators/util:to_image_calculator",
    "//mediapipe/calculators/util:from_image_calculator",
]

PRELOADS_OPTS = [
    # "--preload-file ../../mediapipe/modules/face_detection/face_detection_short_range.tflite@mediapipe/modules/face_detection/face_detection_short_range.tflite",
    # "--preload-file /mediapipe/modules/selfie_segmentation/selfie_segmentation.tflite@mediapipe/modules/selfie_segmentation/selfie_segmentation.tflite",
    # "--preload-file ../mediapipe/mediapipe/modules/selfie_segmentation/selfie_segmentation_landscape.tflite@mediapipe/modules/selfie_segmentation/selfie_segmentation_landscape.tflite",
    # "--preload-file ../mediapipe/mediapipe/modules/face_landmark/face_landmark.tflite@mediapipe/modules/face_landmark/face_landmark.tflite",
]

cc_library(
    name = "main_gpu",
    srcs = glob([
    ]),
    deps = MAIN_GPU_DEPS
    + OPENCV_DEPS
    ,
)


cc_binary(
	name = "main",
    srcs = ["main.cc"],
    data = [
        "//mediapipe/modules/selfie_segmentation:selfie_segmentation.tflite",
        "//mediapipe/modules/face_detection:face_detection_short_range.tflite",
        "//mediapipe/modules/selfie_segmentation:selfie_segmentation_landscape.tflite",
        "//mediapipe/modules/face_landmark:face_landmark.tflite",
    ],
	deps = [
        "main_gpu"
    ] 
    + SELFIE_SEGMENTATION_DEPS
    ,
)

cc_binary(
	name = "main-wasm.js",
    srcs = ["main-wasm.cc"],
    data = [
        "//mediapipe/modules/selfie_segmentation:selfie_segmentation.tflite",
    ],
    linkopts = [
        "-s USE_PTHREADS=0",
        "-s ALLOW_MEMORY_GROWTH=1",
        "-s ERROR_ON_UNDEFINED_SYMBOLS=1",
        "-s USE_WEBGL2=1",
        "--export-all",
        "-s ASSERTIONS=1",
        "--bind",
        "-s STANDALONE_WASM=0", # generates only wasm file, not .js file? generates independent wasm, but missing utilities of js
        # ----------------------------------------------------- experimenting flags below
        "-s EXIT_RUNTIME=0", # has effect, 0 causes error when using malloc, exit runtime when main() exists, if true then stdio is flushed, atexit()s are called, but cannot call other functions asynchronousely using js
        "-s OFFSCREENCANVAS_SUPPORT=0",                         # for emscripten_webgl_create_context(): Couldn't create webGL 2 context.
        "-s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1",   # for emscripten_webgl_create_context(): Couldn't create webGL 2 context.
        "-v",                                                   # for debugging messages
        "-s GL_DEBUG=0",                                        # debug logs in /tmp/emscripten_temp
        "-s EXPORTED_FUNCTIONS='[\"_malloc\", \"_free\"]'",
        "-s WASM_BIGINT=1",                                     # for passing [u]int64_t from js to wasm
    ] 
    + PRELOADS_OPTS
    ,
	deps = MAIN_GPU_DEPS 
    # + OPENCV_DEPS
    + [
        "//mediapipe/framework/port:logging",
        "//mediapipe/gpu:image_frame_to_gpu_buffer_calculator",
        "//mediapipe/gpu:gl_simple_calculator",
        "//mediapipe/gpu:gl_simple_shaders",
        # face detection
        "//mediapipe/modules/face_detection:face_detection_short_range_gpu",
        # selfie segmentation
        "//mediapipe/modules/selfie_segmentation:selfie_segmentation_gpu",
        "//mediapipe/graphs/selfie_segmentation:selfie_segmentation_gpu_deps",
        # face mesh
        "//mediapipe/calculators/core:constant_side_packet_calculator",
        "//mediapipe/graphs/face_mesh/subgraphs:face_renderer_gpu",
        "//mediapipe/modules/face_landmark:face_landmark_front_gpu",
    ]
    ,
)

wasm_cc_binary(
    name = "main-wasm",
    cc_target = ":main-wasm.js",
    tags = ["local"],
    # simd = True,
    threads = "emscripten",
)
