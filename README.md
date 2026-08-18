# Financy

[Figma Design](https://www.figma.com/design/2BFQLcj0oD5Jxih6LL71Pn/Financy--Community-?node-id=3-377&p=f&t=WwDRxFPxP6NayGA8-0)

To quickly test the app, simply run:

```bash
docker compose up
```

## Development

A devcontainer is provided for ease of development. You can open it in VSCode or any other IDE and it'll install all the necessary dependencies for you.

When you do `pnpm install`, it'll also run a `postInstall.sh` script to generate .env and the prisma client. You can check out what it does in `./scripts/postInstall.sh`.
