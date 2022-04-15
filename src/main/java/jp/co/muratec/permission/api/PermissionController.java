package jp.co.muratec.permission.api;

import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.apache.ibatis.exceptions.PersistenceException;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jp.co.muratec.ApiListResponseDomain;
import jp.co.muratec.permission.service.PermissionService;

@RestController
public class PermissionController {

	@Autowired
	PermissionService service;
	Logger logger = LoggerFactory.getLogger(getClass().getName());
	
	@RequestMapping(value="/system", method=RequestMethod.GET)
	public ResponseEntity<ApiListResponseDomain<System>> getSystems() throws Exception {
		ApiListResponseDomain<System> response = new ApiListResponseDomain<System>();
		try {
			response.setResult(service.getSystem());
		} catch (Exception e) {
			logger.error("", e);
			if (e instanceof SQLException || e instanceof SQLSyntaxErrorException || e instanceof BadSqlGrammarException
					|| e instanceof PersistenceException || e.getMessage().toString().contains("ORA-")) {
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			} else {
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		return ResponseEntity.ok(response);
	}
	
	@RequestMapping(value="/system", method=RequestMethod.POST)
	public ResponseEntity<ApiListResponseDomain<System>> registSystem(@ModelAttribute List<System> systems) throws Exception {
		ApiListResponseDomain<System> response = new ApiListResponseDomain<System>();
		try {
			service.updateSystemData(systems);
		} catch (Exception e) {
			logger.error("", e);
			if (e instanceof SQLException || e instanceof SQLSyntaxErrorException || e instanceof BadSqlGrammarException
					|| e instanceof PersistenceException || e.getMessage().toString().contains("ORA-")) {
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			} else {
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		return ResponseEntity.ok(response);
	}
}
