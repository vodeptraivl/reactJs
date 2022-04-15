package jp.co.muratec.permission.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import jp.co.muratec.permission.mapper.PermissionMapper;

@Service
public class PermissionService {

	@Autowired
	PermissionMapper mapper;
	
	@Autowired
	PlatformTransactionManager txManager;
	
	private final PlatformTransactionManager transactionManager;
	
//	TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
//	try {
//		transactionManager.commit(txStatus);
//	}catch(Exception e){
//		transactionManager.rollback(txStatus);
//		throw e;
//	}
	
	public PermissionService(PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}
	
	public List<System> getSystem(){
		return mapper.getSystems();
	}
	
	public void updateSystemData(List<System> systems) {
		TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			mapper.updateSystemData(systems);
		}catch(Exception e){
			transactionManager.rollback(txStatus);
			throw e;
		}
		
	}
}
