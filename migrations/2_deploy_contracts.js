const fs = require('fs')
const RealEstateContract = artifacts.require('./RealEstateContract.sol')

module.exports = function (deployer) {
  deployer.deploy(RealEstateContract)
    .then(() => {
        if (RealEstateContract._json) {
        fs.writeFile(
            'src/deployedABI.json',
            JSON.stringify(RealEstateContract._json.abi),
            (err) => {
            if (err) throw err
            console.log("파일에 ABI 입력 성공");
            })
        }

        fs.writeFile(
            'src/deployedAddress.json',
            JSON.stringify({
                address: RealEstateContract.address
            }),
            err => {
                if (err) throw err;
                console.log('파일에 주소 입력 성공');
            },
        );
    })
}
