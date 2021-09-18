const fs = require('fs');
const package = require('./package.json');
const currentVersion = require('./currentVersion.json');

if (currentVersion && currentVersion.data && currentVersion.data.trees) {
	// 將各依賴的版本輸出成Object
	const dependeniesVersion = currentVersion.data.trees
		.map(({ name }) => name)
		.reduce((obj, item) => {
			const dependencyTerm = item.split('@');
			if (dependencyTerm.length >= 2) {
				// console.log('dependencyTerm', dependencyTerm);
				const startWithAt = item.startsWith('@');
				const dependencyName = startWithAt ? `@${dependencyTerm[1]}` : dependencyTerm[0];
				return { ...obj, [dependencyName]: dependencyTerm[startWithAt ? 2 : 1] };
			} else {
				return obj;
			}
		});

	const packagePath = `./package.json`;
	Object.keys(package.dependencies).forEach(key => {
		package.dependencies[key] = dependeniesVersion[key];
	});
	Object.keys(package.devDependencies).forEach(key => {
		package.devDependencies[key] = dependeniesVersion[key];
	});
	fs.writeFileSync(packagePath, JSON.stringify(package));
} else {
	console.log('[Error]', 'currentVersion.json export failed');
}
