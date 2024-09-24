wsb:
	EMCC_DEBUG=1 && sudo bazel build -c opt src/selfie_segmentation:main-wasm --config=wasm
wsr:
	rm -f src/server/public/*wasm.js 2> /dev/null
	rm -f src/server/public/*wasm.wasm 2> /dev/null
	rm -f src/server/public/*wasm.data 2> /dev/null

	sudo cp -r bazel-bin/src/selfie_segmentation/main-wasm/main-wasm.js src/server/public/
	sudo cp -r bazel-bin/src/selfie_segmentation/main-wasm/main-wasm.wasm src/server/public/
	sudo cp -r bazel-bin/src/selfie_segmentation/main-wasm/main-wasm.data src/server/public/

	cd src/server; npm start

selfieb:
	sudo bazel build -c opt --copt -DMESA_EGL_NO_X11_HEADERS --copt -DEGL_NO_X11 src/selfie_segmentation:main
selfier:
	GLOG_logtostderr=1 && \
	sudo bazel-bin/src/selfie_segmentation/main \
  		--calculator_graph_config_file=src/graph_configs/selfie_segmentation_gpu.pbtxt
touchupb:
	bazel build -c opt --copt -DMESA_EGL_NO_X11_HEADERS --copt -DEGL_NO_X11 src/face_touchup:main
touchupr:
	export GLOG_logtostderr=1
	bazel-bin/src/face_touchup/main \
	--calculator_graph_config_file=mediapipe/graphs/face_mesh/face_mesh_desktop_live_gpu.pbtxt
