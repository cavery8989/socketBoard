echo "Creating gh page branch"
git checkout -b gh-pages

echo "Building client..." 
cd client/ && npm i
npm run build

echo "Build complete"
cd ..

echo "Removing excess stuff"
mkdir buildTemp
mv ./client/build/* ./buildTemp 
ls | grep -v buildTemp | xargs rm -rf
mv ./buildTemp/* ./
rm -rf ./buildTemp

echo "pushing to github"
git add .
git commit -m "front end deploy"
git push origin gh-pages

echo "Cleaning up.."
git checkout master
git branch -D gh-pages



