#!/bin/bash

echo "🚀 小桢空间 - 一键上传到 GitHub"
echo ""

read -p "请输入你的 GitHub 用户名: " USERNAME
read -p "请输入你的 GitHub 邮箱: " EMAIL
read -p "请输入你的 GitHub Personal Access Token: " TOKEN

echo ""
echo "正在配置..."

git config user.name "$USERNAME"
git config user.email "$EMAIL"

echo ""
echo "正在推送前端代码..."

cd /workspace
git init
git add .
git commit -m "小桢空间 - 视频分享平台"
git remote add origin https://$TOKEN@github.com/$USERNAME/xiaozhen-space-space.git
git branch -M main
git push -u origin main

echo ""
echo "✅ 前端代码推送成功！"

echo ""
echo "正在推送后端代码..."

cd /workspace/server
git init
git add .
git commit -m "小桢空间 - 后端服务器"
git remote add origin https://$TOKEN@github.com/$USERNAME/xiaozhen-server.git
git branch -M main
git push -u origin main

echo ""
echo "✅ 后端代码推送成功！"

echo ""
echo "🎉 代码已全部上传到 GitHub！"
echo ""
echo "下一步："
echo "1. 打开 https://railway.app 部署后端"
echo "2. 打开 https://netlify.com 部署前端"
