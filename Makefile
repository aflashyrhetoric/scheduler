.PHONY: dev pug stylus pages styles

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
STYLUS_FLAGS := --watch --out "dist" "./src/styles.styl"

###

default:
	make dev

pug: $(PUG_CMD)

stylus: $(STYLUS_CMD)

pages:
	$(PUG_CMD) $(PUG_FLAGS)

server:
	php -S localhost:5000 -t dist

styles:
	$(STYLUS_CMD) $(STYLUS_FLAGS)

dev:
	make pages & make server & make styles
