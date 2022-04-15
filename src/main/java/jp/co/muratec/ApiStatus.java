package jp.co.muratec;

public enum ApiStatus {
	Successed("01"), ParamInvalid("02"), Exception("99"), DBException("10"),
	SystemMasterNotSet("4")
	;

	private String apiStatusCd;

	private ApiStatus(String apiStatusCd) {
		this.apiStatusCd = apiStatusCd;
	}

	/**
	 * Get custom value
	 */
	public String toString() {
		return this.apiStatusCd;
	}

	/**
	 * Based on custom value to enum
	 * 
	 * @param apiStatusCd
	 * @return
	 */
	public static ApiStatus getValue(String apiStatusCd) {
		for (ApiStatus dow : ApiStatus.values()) {
			if (dow.toString().equalsIgnoreCase(apiStatusCd)) {
				return dow;
			}
		}

		return null;
	}
}