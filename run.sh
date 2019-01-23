#!/bin/bash
if [ -e "$HOME/.nvm/nvm.sh" ]; then
  . ~/.nvm/nvm.sh
  nvm use v6.5
fi

bundle exec ./node_modules/.bin/gulp
