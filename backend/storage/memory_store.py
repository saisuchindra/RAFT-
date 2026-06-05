from threading import Lock


class MemoryKeyValueStore:
    """A small thread-safe in-memory key-value store.

    FastAPI can handle multiple requests at the same time. The lock keeps
    reads and writes from stepping on each other while we are using a dict.
    """

    def __init__(self) -> None:
        self._data: dict[str, str] = {}
        self._lock = Lock()

    def set(self, key: str, value: str) -> None:
        with self._lock:
            self._data[key] = value

    def get(self, key: str) -> str | None:
        with self._lock:
            return self._data.get(key)

    def delete(self, key: str) -> bool:
        with self._lock:
            if key not in self._data:
                return False

            del self._data[key]
            return True

    def items(self) -> dict[str, str]:
        with self._lock:
            return dict(sorted(self._data.items()))

    def clear(self) -> None:
        with self._lock:
            self._data.clear()
