https://blog.seeso.io/face-detection-on-web-tflite-wasm-simd-462975e0f628

#### with simd (error)
```bash
emcmake cmake .. -DCMAKE_CXX_FLAGS="-pthread -msimd128" -DBUILD_IPP_IW=OFF -DBUILD_ITT=OFF -DBUILD_JPEG=ON -DBUILD_PACKAGE=OFF -DBUILD_PERF_TESTS=OFF -DBUILD_PROTOBUF=OFF -DBUILD_SHARED_LIBS=OFF -DBUILD_TESTS=OFF -DBUILD_ZLIB=ON -DBUILD_opencv_apps=OFF -DBUILD_opencv_calib3d=ON -DBUILD_opencv_core=ON -DBUILD_opencv_dnn=OFF -DBUILD_opencv_features2d=ON -DBUILD_opencv_flann=ON -DBUILD_opencv_gapi=OFF -DBUILD_opencv_highgui=OFF -DBUILD_opencv_imgcodecs=ON -DBUILD_opencv_imgproc=ON -DBUILD_opencv_java_bindings_generator=OFF -DBUILD_opencv_js=OFF -DBUILD_opencv_js_bindings_generator=OFF -DBUILD_opencv_ml=OFF -DBUILD_opencv_objc_bindings_generator=OFF -DBUILD_opencv_objdetect=OFF -DBUILD_opencv_photo=OFF -DBUILD_opencv_python_bindings_generator=OFF -DBUILD_opencv_python_tests=OFF -DBUILD_opencv_stitching=OFF -DBUILD_opencv_ts=OFF -DBUILD_opencv_video=OFF -DBUILD_opencv_videoio=OFF -DBUILD_opencv_world=ON -DCV_ENABLE_INTRINSICS=ON -DOPENCV_DNN_OPENCL=OFF -DWITH_1394=OFF -DWITH_ADE=OFF -DWITH_FFMPEG=OFF -DWITH_GSTREAMER=OFF -DWITH_GTK=OFF -DWITH_IMGCODEC_HDR=OFF -DWITH_IMGCODEC_PFM=OFF -DWITH_IMGCODEC_PXM=OFF -DWITH_IMGCODEC_SUNRASTER=OFF -DWITH_IPP=OFF -DWITH_ITT=OFF -DWITH_JPEG=ON -DWITH_JASPER=OFF -DWITH_LAPACK=OFF -DWITH_OPENCL=OFF -DWITH_OPENCLAMDBLAS=OFF -DWITH_OPENCLAMDFFT=OFF -DWITH_PNG=OFF -DWITH_PROTOBUF=OFF -DWITH_PTHREADS_PF=ON -DWITH_QUIRC=OFF -DWITH_TIFF=OFF -DWITH_V4L=OFF -DWITH_VA=OFF -DWITH_VA_INTEL=OFF -DWITH_WEBP=OFF
```

#### without simd (ok)
```bash
emcmake cmake .. -DCMAKE_CXX_FLAGS="-pthread" -DBUILD_IPP_IW=OFF -DBUILD_ITT=OFF -DBUILD_JPEG=ON -DBUILD_PACKAGE=OFF -DBUILD_PERF_TESTS=OFF -DBUILD_PROTOBUF=OFF -DBUILD_SHARED_LIBS=OFF -DBUILD_TESTS=OFF -DBUILD_ZLIB=ON -DBUILD_opencv_apps=OFF -DBUILD_opencv_calib3d=ON -DBUILD_opencv_core=ON -DBUILD_opencv_dnn=OFF -DBUILD_opencv_features2d=ON -DBUILD_opencv_flann=ON -DBUILD_opencv_gapi=OFF -DBUILD_opencv_highgui=OFF -DBUILD_opencv_imgcodecs=ON -DBUILD_opencv_imgproc=ON -DBUILD_opencv_java_bindings_generator=OFF -DBUILD_opencv_js=OFF -DBUILD_opencv_js_bindings_generator=OFF -DBUILD_opencv_ml=OFF -DBUILD_opencv_objc_bindings_generator=OFF -DBUILD_opencv_objdetect=OFF -DBUILD_opencv_photo=OFF -DBUILD_opencv_python_bindings_generator=OFF -DBUILD_opencv_python_tests=OFF -DBUILD_opencv_stitching=OFF -DBUILD_opencv_ts=OFF -DBUILD_opencv_video=OFF -DBUILD_opencv_videoio=OFF -DBUILD_opencv_world=ON -DCV_ENABLE_INTRINSICS=OFF -DOPENCV_DNN_OPENCL=OFF -DWITH_1394=OFF -DWITH_ADE=OFF -DWITH_FFMPEG=OFF -DWITH_GSTREAMER=OFF -DWITH_GTK=OFF -DWITH_IMGCODEC_HDR=OFF -DWITH_IMGCODEC_PFM=OFF -DWITH_IMGCODEC_PXM=OFF -DWITH_IMGCODEC_SUNRASTER=OFF -DWITH_IPP=OFF -DWITH_ITT=OFF -DWITH_JPEG=ON -DWITH_JASPER=OFF -DWITH_LAPACK=OFF -DWITH_OPENCL=OFF -DWITH_OPENCLAMDBLAS=OFF -DWITH_OPENCLAMDFFT=OFF -DWITH_PNG=OFF -DWITH_PROTOBUF=OFF -DWITH_PTHREADS_PF=ON -DWITH_QUIRC=OFF -DWITH_TIFF=OFF -DWITH_V4L=OFF -DWITH_VA=OFF -DWITH_VA_INTEL=OFF -DWITH_WEBP=OFF
```

```bash
emmake make -j 6
```

modules/world/CMakeFiles/opencv_world.dir/__/...


```bash

[ 59%] Building CXX object modules/world/CMakeFiles/opencv_world.dir/__/imgproc/src/connectedcomponents.cpp.o
/home/pinku/tmp/opencv/modules/imgproc/src/color_lab.cpp:965:19: warning: unused variable 'enablePackedLab' [-Wunused-const-variable]
  965 | static const bool enablePackedLab = true;
      |                   ^~~~~~~~~~~~~~~
/home/pinku/tmp/opencv/modules/imgproc/src/color_lab.cpp:982:19: warning: unused variable 'enablePackedRGB2Luv' [-Wunused-const-variable]
  982 | static const bool enablePackedRGB2Luv = true;
      |                   ^~~~~~~~~~~~~~~~~~~
/home/pinku/tmp/opencv/modules/imgproc/src/color_lab.cpp:983:19: warning: unused variable 'enablePackedLuv2RGB' [-Wunused-const-variable]
  983 | static const bool enablePackedLuv2RGB = true;
      |                   ^~~~~~~~~~~~~~~~~~~
/home/pinku/tmp/opencv/modules/imgproc/src/color_lab.cpp:1387:20: warning: unused function 'trilinearPackedInterpolate' [-Wunused-function]
 1387 | static inline void trilinearPackedInterpolate(const v_uint16x8& inX, const v_uint16x8& inY, const v_uint16x8& inZ,

```

understand output folders of cmake cmd