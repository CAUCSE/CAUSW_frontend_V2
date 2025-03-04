'use client'

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BASEURL, getRccAccess } from "@/shared";

const EventNotificationSettings = () => {
    const [studentId, setStudentId] = useState<string>('');
    const [subscribedIds, setSubscribedIds] = useState<number[]>([]);
    const [removedIds, setRemovedIds] = useState<number[]>([]);
    const [subscribeAll, setSubscribeAll] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [settingsExist, setSettingsExist] = useState<boolean>(false); // 알림 설정이 존재하는지 여부
    const currentYear = new Date().getFullYear(); // 현재 연도

    // 초기 설정 불러오기
    const fetchSettings = async () => {
        try {
            setLoading(true);

            // getRccAccess로 AccessToken을 가져와 헤더에 포함
            const accessToken = await getRccAccess();
            if (!accessToken) {
                throw new Error("AccessToken이 존재하지 않습니다.");
            }

            const response = await axios.get(`${BASEURL}/api/v1/ceremony/notification-setting`, {
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            });

            // API 응답 로깅 (디버깅용)
            console.log('불러온 설정 데이터:', JSON.stringify(response.data, null, 2));

            // 설정이 이미 존재하는지 확인 (응답이 있으면 설정 존재)
            setSettingsExist(true);

            // 설정 데이터로 상태 업데이트
            if (response.data.setAll) {
                setSubscribeAll(true);
            } else {
                setSubscribeAll(false);
            }
            
            // 활성화된 학번 설정 (setAll 여부와 관계없이 항상 저장)
            setSubscribedIds(response.data.subscribedAdmissionYears || []);

            // 삭제된 학번 목록 초기화
            setRemovedIds([]);
            setError(null);
        } catch (error) {
            console.error('설정 불러오기 오류:', error);

            if (error instanceof AxiosError && error.response?.status === 404) {
                // 404 에러는 설정이 아직 없다는 의미로 처리
                setSettingsExist(false);
                setSubscribedIds([]);
                setSubscribeAll(false);
                setError(null);
            } else if (error instanceof AxiosError) {
                setError(error.response?.data?.message || "경조사 알림 설정을 불러오는 중 오류가 발생했습니다.");
            } else {
                setError("예상하지 못한 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const validateAndAddStudentId = () => {
        if (!studentId.trim()) return;

        // 숫자만 입력되었는지 확인하고 4자리인지 검증
        if (!/^\d{4}$/.test(studentId)) {
            setError('4자리 학번을 입력해주세요.');
            return;
        }

        const numericId = Number(studentId);

        // 현재 연도보다 큰 학번은 입력할 수 없음
        if (numericId > currentYear) {
            setError(`${currentYear}학번까지만 입력 가능합니다.`);
            return;
        }

        // 이미 등록된 학번인지 확인
        if (subscribedIds.includes(numericId)) {
            setError('이미 등록된 학번입니다.');
            return;
        }

        // 새로운 배열을 생성하고 숫자로 정렬
        const newIds: number[] = [...subscribedIds, numericId];
        newIds.sort((a, b) => a - b);

        setSubscribedIds(newIds);

        // 만약 이전에 삭제했던 학번을 다시 추가한다면, 삭제 목록에서 제거
        if (removedIds.includes(numericId)) {
            setRemovedIds(removedIds.filter(id => id !== numericId));
        }

        setStudentId('');
        setError(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !subscribeAll) {
            validateAndAddStudentId();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 숫자만 입력 가능하고 최대 4자리로 제한
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setStudentId(value);
        setError(null);
    };

    const handleRemoveStudentId = (id: number) => {
        // UI에서 학번 제거
        setSubscribedIds(subscribedIds.filter(subId => subId !== id));

        // 삭제된 학번 목록에 추가 (저장 시 notificationActive: false로 설정하기 위해)
        setRemovedIds([...removedIds, id]);
    };

    const handleSubscribeAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isAllEnabled = e.target.checked;
        setSubscribeAll(isAllEnabled);
        
        if (isAllEnabled) {
            // setAll을 true로 변경할 때는 기존 학번 데이터를 유지
            // UI에서는 보이지 않지만 데이터는 유지됨
            setStudentId('');
            setError(null);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            // getRccAccess로 AccessToken을 가져와 헤더에 포함
            const accessToken = await getRccAccess();
            if (!accessToken) {
                throw new Error("AccessToken이 존재하지 않습니다.");
            }

            // 요청 데이터 준비
            let requestData;
            
            if (settingsExist) {
                // 기존 설정이 있는 경우 (PUT 요청)
                requestData = {
                    subscribedAdmissionYears: subscribeAll ? subscribedIds : subscribedIds,
                    setAll: subscribeAll,
                    notificationActive: true
                };
            } else {
                // 신규 설정 생성 (POST 요청)
                requestData = {
                    subscribedAdmissionYears: subscribeAll ? [0] : subscribedIds,
                    setAll: subscribeAll,
                    notificationActive: true
                };
            }

            console.log('저장할 데이터:', requestData);

            // 설정이 이미 존재하는지에 따라 POST 또는 PUT 요청 사용
            let response;
            if (settingsExist) {
                // PUT 요청 - 기존 설정 업데이트
                response = await axios.put(`${BASEURL}/api/v1/ceremony/notification-setting`, requestData, {
                    headers: {
                        Authorization: accessToken,
                        "Content-Type": "application/json",
                        "accept": "*/*"
                    },
                });
                console.log('PUT 응답:', response.data);
            } else {
                // POST 요청 - 새 설정 생성
                response = await axios.post(`${BASEURL}/api/v1/ceremony/notification-setting`, requestData, {
                    headers: {
                        Authorization: accessToken,
                        "Content-Type": "application/json",
                        "accept": "*/*"
                    },
                });
                console.log('POST 응답:', response.data);
                
                // 이제 설정이 존재함을 표시
                setSettingsExist(true);
            }

            // 성공 처리
            alert('경조사 알림 설정이 저장되었습니다.');
            setError(null);

            // 삭제 목록 초기화
            setRemovedIds([]);
        } catch (error) {
            console.error('저장 오류:', error);

            if (error instanceof AxiosError) {
                setError(error.response?.data?.message || "경조사 알림 설정을 저장하는 중 오류가 발생했습니다.");
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("예상하지 못한 오류가 발생했습니다.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p>불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
            <div className="w-[600px] bg-white p-8 rounded shadow-md">
                <h1 className="text-xl font-semibold text-center mb-8">경조사 알림 설정</h1>
                <h2 className="text-lg font-normal mb-6">경조사 알림을 받을 학번 설정</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-6 flex flex-col">
                    {/* 입력 부분 */}
                    <div className="w-full mb-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={studentId}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="학번 입력"
                                        maxLength={4}
                                        disabled={subscribeAll}
                                        className="w-32 h-10 border rounded px-3 disabled:bg-gray-100"
                                    />
                                    <span className="whitespace-nowrap mx-2">학번</span>
                                    <button
                                        onClick={validateAndAddStudentId}
                                        disabled={subscribeAll}
                                        className="px-6 h-10 bg-blue-400 text-white rounded text-sm hover:bg-blue-500 disabled:bg-gray-200 whitespace-nowrap"
                                    >
                                        추가
                                    </button>
                                </div>
                                {!subscribeAll && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        * {currentYear}학번까지 입력 가능합니다.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-4 mt-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={subscribeAll}
                                    onChange={handleSubscribeAllChange}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm whitespace-nowrap">모든 학번의 경조사 알림 받기</span>
                            </label>
                        </div>
                    </div>

                    {/* 학번 리스트 */}
                    <div className="w-full">
                        <div className={`border rounded ${subscribeAll ? 'bg-gray-50' : 'bg-white'}`}>
                            <div className="h-48 overflow-y-auto p-4">
                                {!subscribeAll && subscribedIds.length > 0 ? (
                                    subscribedIds.map((id) => (
                                        <div key={id} className="flex items-center justify-between py-1">
                                            <span className="text-sm">{id}학번</span>
                                            <button
                                                onClick={() => handleRemoveStudentId(id)}
                                                className="text-gray-700 hover:text-red-500 px-2"
                                                disabled={subscribeAll}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm text-center py-4">
                                        {subscribeAll
                                            ? "모든 학번의 경조사 알림을 받습니다."
                                            : "등록된 학번이 없습니다."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full h-12 bg-blue-400 text-white rounded hover:bg-blue-500 disabled:bg-gray-300"
                >
                    {saving ? '저장 중...' : '저장'}
                </button>
            </div>
        </div>
    );
};

export default EventNotificationSettings;