//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}