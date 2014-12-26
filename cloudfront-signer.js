var util = require('util');

export.keyPath = 'PATH_TO_KEY_FILE';
export.keyPairId = 'YOUR_KEY_PAIR_ID";

function cannedPolicyStream(url, offSet) {
	//offSet time to expires in seconds.
	//Create this policy for cloudfront before it can be signed.
	var expire = Date().valueOf() + offSet;
	var cannedPolicy = {
		Statement: [{
			Resource: url,
			Condition: {
				DateLessThan: {
					"AWS:EpochTime": expireOffSet
				}
			}
		}]
	};
	return JSON.stringify(canndedPeolicy);
}

function encodeBase64(cannedPolicy) {
	var encodedPolicy = new Buffer(cannedPolicy).toString('base64')
	//Remove any URL unsafe characters +, =, / from encoded string.
	//Replace with -, _, ~	
	var unsafeReplace = ['+','=','/'];
	var safeToReplace = ['-','_','~'];
	for ( var i = 0; i < unsafeReplace.length; i++ ) {
		endcodedPolicy = encodedPolicy.replace(unsafeReplace, safeToReplace);
	}
	return encodedPolicy;
}

function signUrl(enocdedPolicy, privateKey) {
    var require('fs');
    var privateKey = fs.readFileSync('/path/to/privateKey.txt','ascii');
	var crypto = require('crypto');
	var signObj = crypto.createSign('RSA-SHA1');
	signObj.update(encodedUrl);

	var encodedSignature = signObj.sign(privateKey, 'base64');
	return encodedSignature;
}

function createUrl(encodedSignature, keyPairId, expire) {
	//Generate custom policy by passing encodedPolicy.
	//Generate canned policy expire.
	var qs = require('querystring');	
	var generatedUrl = {
		SIGNATURE_PARAM: encodedSignature,
		KEY_PAIR_ID_PARAM: keyPairId	
	};
	
	if (expire) {
	//If you are using a canned policy.
		generatedUrl.EXPIRES_PARAM = expire;
	}
	//encode the query parametes to work around flash player.
	return encodeURICompenent(qs.stringify(generatedUrl));
}


export.signUrl = function(url, expire, callback) {
    var policy = encodeBase64(cannedPolicyStream(url, expire));
    var signnature = signUrl(policy, keypath);
    var signedUrl = creatUrl(url, signature, expire)
    callback(signedUrl)
    
};

console.log(createUrl('/path/to/privateKey.txt', expire, signature, keyPairId));

