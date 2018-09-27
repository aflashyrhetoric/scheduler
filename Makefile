# cmd
PUG_CMD = $(NODE_BIN_DIR)/pug
STYLUS_CMD = $(NODE_BIN_DIR)/stylus

# dir
NODE_MODULE_DIR := $(realpath node_modules)
NODE_BIN_DIR := $(realpath $(NODE_MODULE_DIR)/.bin)
VIEW_DIR := $(realpath views)
SRC_DIR := $(realpath src)
BUILD_DIR := dist

PUG_FLAGS := --basedir $(VIEW_DIR) --watch $(VIEW_DIR)/**.pug --out $(BUILD_DIR) --obj '{hi:"bye"}' $(VIEW_DIR)/**.pug

.PHONY: dev pug stylus students

default:
	pug

pug:
	$(PUG_CMD) 

stylus:
	$(STYLUS_CMD) --watch --out "dist" "./src/styles.styl"

pages:
	$(PUG_CMD) $(PUG_FLAGS)

dev:
	$(PUG_CMD) --basedir $(VIEW_DIR) --out $(BUILD_DIR) $(VIEW_DIR)/index.pug --obj '{hi:"bye"}'
