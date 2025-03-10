# Token Vesting UI

This is deployed from the repo diodechain/token-vesting-ui

Assuming this website is in `~/projects/diode/website`:

```bash
cd ~/projects/diode/
git clone git@github.com:diodechain/token-vesting-ui.git
cd token-vesting-ui
npm run-script build
rm -rf ../website/vesting/
cp -R build/ ../website/vesting
```
