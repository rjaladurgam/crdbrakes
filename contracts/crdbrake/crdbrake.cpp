#include "crdbrake.hpp"


void crdbrake::starttest(name testtype) {
	print( "Start test, ", name{testtype});
	//auto start = std::chrono::system_clock::now();

	_tests.emplace(_self, [&](auto& new_test) {
		new_test.testname = testtype;
		//new_test.testtime = std::time(0);
		new_test.testresult = 0;
	});
}

void crdbrake::endtest(name testtype, int result) {
	print( "End test, ", name{testtype});

	_tests.emplace(_self, [&](auto& new_test) {
		new_test.testname = testtype;
		//new_test.testtime = std::time(0);
		new_test.testresult = result;
	});
}


EOSIO_DISPATCH(crdbrake, (starttest)(endtest));