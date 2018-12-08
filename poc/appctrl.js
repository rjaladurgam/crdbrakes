angular.module('demoApp', [])
  .controller('appController', ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.menuactive = 'dash';
          $scope.smartupdateinput = {
          	hasDura5kkmtest : false,
          	hasDura10kkmtest : false,
          	hasStop10fttest : false,
          	hasStop5fttest : false
          } ;
          
          $scope.menucliked = function(item){
              $scope.menuactive = item;
          };

		  $scope.updatesmart = function(){
             if($scope.smartupdateinput.hasDura5kkmtest){
              alert("5000 Km durability check done");

              }

              if($scope.smartupdateinput.hasDura10kkmtest){
              alert("10000 Km durability check done");
              }

              if($scope.smartupdateinput.hasStop10fttest){
              alert("10 ft stop check done");
              }

              if($scope.smartupdateinput.hasStop5fttest){
              alert("5 ft durability check done");
              }
              sendToSmartContract($scope.smartupdateinput.hasStop5fttest, $scope.smartupdateinput.hasStop10fttest, $scope.smartupdateinput.hasDura10kkmtest, $scope.smartupdateinput.hasDura5kkmtest);
          };   

          /** Transactions are only valid on the selected chain. */
  		$scope.chain = {
    main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
    jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
    sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
  }

  /**
    Other httpEndpoint's: https://www.eosdocs.io/resources/apiendpoints
  */
  $scope.eos = Eos({
    keyProvider: '5J6daEZip3j8dX9Pccd6XRKQRCpCyZxxsJHRxci2ChQP4QBh8Ez',// private key
    httpEndpoint: 'http://127.0.0.1:7777',
    chainId: $scope.chain.sys,
  });

  function sendToSmartContract(hasStop5fttest,hasStop10fttest,hasDura5kkmtest,hasDura5kkmtest){
    $scope.eos.transaction({
      actions:[
      {
        account: 'eosbrakes',
        name: 'starttest',
        authorization:[{
          actor: 'eosbrakes',
          permission: 'active'
        }],
        data:{
            testtype: '5kt' + new Date().getMilliseconds()
          }
      }
      ]
    });

  }
  /**
    Sign and broadcast a transaction.

    @example updateProducerVote('myaccount', 'proxyaccount', ['respectedbp'])
  */
  async function updateProducerVote(voter, proxy = '', producers = []) {
    return eos.voteproducer(voter, proxy, producers)
  }
}]);


