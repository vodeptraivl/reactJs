package jp.co.muratec;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@JsonPropertyOrder({ "statusCd", "result" })
public class ApiListResponseDomain<T> extends ApiResponse {
	public ApiListResponseDomain() {
	}

	@JsonProperty("dataList")
	private List<T> result;
}
