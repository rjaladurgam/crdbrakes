#include <eosiolib/eosio.hpp>
#include <chrono>
#include <ctime>

using namespace eosio;

CONTRACT crdbrake : public contract {

	private:
		TABLE test_info {
	 	 name    testname;
         int     testresult;
      	 auto primary_key() const { return testname.value; }
       };

       typedef multi_index<"test"_n, test_info> tests_table;

       tests_table _tests;

	public:
		crdbrake( name receiver, name code, datastream<const char*> ds):contract(receiver,code, ds),_tests(code, code.value){}

		ACTION starttest(name testtype);

		ACTION endtest(name testtype, int result);		
};