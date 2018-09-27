# cmd
PUG_CMD = $(NODE_BIN_DIR)/pug
STYLUS_CMD = $(NODE_BIN_DIR)/stylus

# dir
NODE_MODULE_DIR := $(realpath node_modules)
NODE_BIN_DIR := $(realpath $(NODE_MODULE_DIR)/.bin)
VIEW_DIR := $(realpath views)
BUILD_DIR := dist

.PHONY: dev pug stylus

pug:
	$(PUG_CMD) 

stylus:
	$(stylus) --basedir $(VIEW_DIR) --out $(BUILD_DIR) $(VIEW_DIR)/index.pug

default:
	pug

students:
	$(PUG_CMD) --basedir $(VIEW_DIR) --out $(BUILD_DIR) $(VIEW_DIR)/students.pug

dev:
	$(PUG_CMD) --basedir $(VIEW_DIR) --out $(BUILD_DIR) $(VIEW_DIR)/index.pug --obj '{hi:"bye"}'
