import { joseToDer } from "./ecdsa-utils";
import { Fido2Utils } from "./fido2-utils";

describe("joseToDer", () => {
  it("should convert P1336 to DER when 'R' is positive and 'S' is positive", () => {
    const signature = Fido2Utils.stringToBuffer(
      "9-J_oWz5j36r6LEPB_VN2ejq0qKgXMzdy1XPESqmA3fMheRGN5LkMwTD2EmoqIptOXaVoCTDAPQB6vG6V8DZsw",
    );

    const result = joseToDer(signature, "ES256");

    const expected = Fido2Utils.stringToBuffer(
      "MEYCIQD34n-hbPmPfqvosQ8H9U3Z6OrSoqBczN3LVc8RKqYDdwIhAMyF5EY3kuQzBMPYSaioim05dpWgJMMA9AHq8bpXwNmz",
    );
    expect(result).toEqual(expected);
  });

  it("should convert P1336 to DER when 'R' is negative and 'S' is negative", () => {
    const signature = Fido2Utils.stringToBuffer(
      "ACEVACu78c59E0lmfw9kQhXlTnrN2Cha8-YUjgpzgIIcqHfzOATDb62pQA01FsYFtQ8IXkEjWyqMLrf6Gy1vZQ",
    );

    const result = joseToDer(signature, "ES256");

    const expected = Fido2Utils.stringToBuffer(
      "MEMCHyEVACu78c59E0lmfw9kQhXlTnrN2Cha8-YUjgpzgIICIByod_M4BMNvralADTUWxgW1DwheQSNbKowut_obLW9l",
    );
    expect(result).toEqual(expected);
  });

  it("should convert P1336 to DER when 'R' is negative and 'S' is positive", () => {
    const signature = Fido2Utils.stringToBuffer(
      "9-J_oWz5j36r6LEPB_VN2ejq0qKgXMzdy1XPESqmA3dMheRGN5LkMwTD2EmoqIptOXaVoCTDAPQB6vG6V8DZsw",
    );

    const result = joseToDer(signature, "ES256");

    const expected = Fido2Utils.stringToBuffer(
      "MEUCIQD34n-hbPmPfqvosQ8H9U3Z6OrSoqBczN3LVc8RKqYDdwIgTIXkRjeS5DMEw9hJqKiKbTl2laAkwwD0AerxulfA2bM",
    );
    expect(result).toEqual(expected);
  });

  it("should convert P1336 to DER when 'R' is positive and 'S' is negative", () => {
    const signature = Fido2Utils.stringToBuffer(
      "d-J_oWz5j36r6LEPB_VN2ejq0qKgXMzdy1XPESqmA3fMheRGN5LkMwTD2EmoqIptOXaVoCTDAPQB6vG6V8DZsw",
    );

    const result = joseToDer(signature, "ES256");

    const expected = Fido2Utils.stringToBuffer(
      "MEUCIHfif6Fs-Y9-q-ixDwf1Tdno6tKioFzM3ctVzxEqpgN3AiEAzIXkRjeS5DMEw9hJqKiKbTl2laAkwwD0AerxulfA2bM",
    );
    expect(result).toEqual(expected);
  });

  it("should convert P1336 to DER when 'R' has leading zero and is negative and 'S' is positive", () => {
    const signature = Fido2Utils.stringToBuffer(
      "AKq25+LDn+n6XCsDiIKQc0z5MCjGESXBAwAT/U5iZPFCGeQbD2EEnoQrinxvrHGqH0g0e7ohnNa6EKdpX9GEXA==",
    );

    const result = joseToDer(signature, "ES256");

    const expected = Fido2Utils.stringToBuffer(
      "MEQCIACqtufiw5/p+lwrA4iCkHNM+TAoxhElwQMAE/1OYmTxAiBCGeQbD2EEnoQrinxvrHGqH0g0e7ohnNa6EKdpX9GEXA==",
    );

    expect(result).toEqual(expected);
  });

  it("should convert P1336 to DER when 'R' is positive and 'S' has leading zero and is negative ", () => {
    const signature = Fido2Utils.stringToBuffer(
      "KKq25+LDn+n6XCsDiIKQc0z5MCjGESXBAwAT/U5iZPEAyOQbD2EEnoQrinxvrHGqH0g0e7ohnNa6EKdpX9GEXA==",
    );

    const result = joseToDer(signature, "ES256");

    const expected = Fido2Utils.stringToBuffer(
      "MEQCICiqtufiw5/p+lwrA4iCkHNM+TAoxhElwQMAE/1OYmTxAiAAyOQbD2EEnoQrinxvrHGqH0g0e7ohnNa6EKdpX9GEXA==",
    );

    expect(result).toEqual(expected);
  });
});
