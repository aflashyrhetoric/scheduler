.PHONY: dev pug

pug:
	$(PUG_CMD) --basedir $(VIEW_DIR) --out $(BUILD_DIR) $(VIEW_DIR)/index.pug

default:

dev:
	pug 

PUG_CMD = $(NODE_BIN_DIR)/pug

NODE_MODULE_DIR := $(realpath node_modules)
NODE_BIN_DIR := $(realpath $(NODE_MODULE_DIR)/.bin)

BUILD_DIR := dist
VIEW_DIR := $(realpath views)

# $(NODE_BIN_DIR)/pug $(PUG_COMMON_FLAGS) $(PUG_FLAGS) --out $(BUILD_DIR) $(realpath src)/index.pug
